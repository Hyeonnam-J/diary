package com.hn.api.diary.controller;

import com.hn.api.diary.config.AuthSession;
import com.hn.api.diary.config.JwsKey;
import com.hn.api.diary.dto.SignInDTO;
import com.hn.api.diary.dto.SignUpDTO;
import com.hn.api.diary.response.SessionResponse;
import com.hn.api.diary.service.UserService;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @PostMapping(value = "/signUp")
    public void signUp(@RequestBody SignUpDTO signUpDTO){
        userService.signUp(signUpDTO);
    }

    @PostMapping(value = "/signIn")
    public SessionResponse signIn(@RequestBody SignInDTO signInDTO){
        Long userId = userService.signIn(signInDTO);

        SecretKey key = JwsKey.getJwsSecretKey();

        Date generateDate = new Date();
        Date expirateDate = new Date(generateDate.getTime() + (60 * 1000));

        String jws = Jwts.builder()
                .subject(String.valueOf(userId))
                .signWith(key)
                .issuedAt(generateDate)
                .expiration(expirateDate)
                .compact();

        /* 아래는 쿠키 인증 ↓ */
//        ResponseCookie cookie = ResponseCookie.from("SESSION", token)
//                .domain("localhost")    // todo 배포 전 수정.
//                .path("/")
//                .httpOnly(true)
//                .secure(false)
//                .maxAge(Duration.ofDays(30))
//                .sameSite("Strict")
//                .build();
//
//        return ResponseEntity.ok()    // 리턴 타입 ResponseEntity<Object>
//                .header(HttpHeaders.SET_COOKIE, cookie.toString())
//                .build();
        /* 쿠키 인증 ↑ */

        return new SessionResponse(jws);
    }

    @PostMapping(value = "/sendCookie")
    public Long sendCookie(AuthSession authSession){
        return authSession.id;
    }

    @PostMapping(value = "/test")
    public String test(){
        System.out.println("test");
        return "test";
    }
}
