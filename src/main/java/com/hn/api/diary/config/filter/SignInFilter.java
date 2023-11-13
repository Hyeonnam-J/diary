package com.hn.api.diary.config.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hn.api.diary.config.JwsKey;
import com.hn.api.diary.dto.SessionDTO;
import com.hn.api.diary.dto.SignInDTO;
import com.hn.api.diary.response.SessionResponse;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class SignInFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired private ObjectMapper objectMapper;

    private static final AntPathRequestMatcher SIGN_IN_REQUEST_MATCHER
            = new AntPathRequestMatcher("/signIn", "POST");

    public SignInFilter() {
        super(SIGN_IN_REQUEST_MATCHER);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        SignInDTO signInDTO = new ObjectMapper().readValue(request.getInputStream(), SignInDTO.class);
        String username = signInDTO.getEmail();
        String password = signInDTO.getPassword();

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);

        token.setDetails(this.authenticationDetailsSource.buildDetails(request));
        return this.getAuthenticationManager().authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // 실행하면 리다이렉트가 된다. 여기서 바로 클라이언트로 리턴하기 위해서 삭제.
//        super.successfulAuthentication(request, response, chain, authResult);

        UserDetails userDetails = (UserDetails) authResult.getPrincipal();

        List<GrantedAuthority> authorities = new ArrayList<>(userDetails.getAuthorities());
        List<String> rolesList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        String roles = String.join(",", rolesList);

        SessionDTO sessionDTO = SessionDTO.builder()
                .email(userDetails.getUsername())
                .password(userDetails.getPassword())
                .role(roles)
                .build();
        String jwtSubject = objectMapper.writeValueAsString(sessionDTO);

        SecretKey key = JwsKey.getJwsSecretKey();

        Date generateDate = new Date();
        Date expirateDate = new Date(generateDate.getTime() + (60 * 1000));

        String jws = Jwts.builder()
                .subject(jwtSubject)
                .signWith(key)
                .issuedAt(generateDate)
                .expiration(expirateDate)
                .compact();

        response.setStatus(HttpServletResponse.SC_OK);
        response.addHeader(HttpHeaders.AUTHORIZATION, jws);

        response.setContentType("application/json");

        String body = objectMapper.writeValueAsString(new SessionResponse(jws));
        response.getWriter().write(body);
    }
}
