insert into user (email, password, role, created_date, nick) values ('hn', 'hn', 'USER', now(), 'hn1');
insert into user (email, password, role, created_date, nick) values ('hn2', 'hn2', 'ADMIN', now(), 'hn22');
insert into user (email, password, role, created_date, nick) values ('test@naver.com', '!@#QWEasdzxc', 'USER', now(), 'hn3');
insert into free_board_post (title, content, view_count, is_delete, created_date, last_modified_date, user_id, origin, parent_id, num, depth) values ('title1', 'Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', 0, false, now(), now(), 1, 1, 1, 0, 0);
insert into free_board_post (title, content, view_count, is_delete, created_date, last_modified_date, user_id, origin, parent_id, num, depth) values ('title2', 'Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', 0, false, now(), now(), 2, 2, 2, 0, 0);
insert into free_board_post (title, content, view_count, is_delete, created_date, last_modified_date, user_id, origin, parent_id, num, depth) values ('title3', 'Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', 0, false, now(), now(), 3, 3, 3, 0, 0);
insert into free_board_comment (origin, user_id, free_board_post_id, is_delete, content, created_date, last_modified_date, is_parent) values (1, 1, 1, false, 'comment-Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', now(), now(), true);
insert into free_board_comment (origin, user_id, free_board_post_id, is_delete, content, created_date, last_modified_date, is_parent) values (2, 2, 1, false, 'comment-Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', now(), now(), true);
insert into free_board_comment (origin, user_id, free_board_post_id, is_delete, content, created_date, last_modified_date, is_parent) values (3, 3, 1, false, 'comment-Florivax jumblemix trivion blazzify flibberjack sprogle buzzlenook zyptonic klazmatic crungleflap splixify zorptical glibberwocky plixionaire whizzleton scrimbleflux drazzleton xyptonic fuzzlenook splindarify zappleton jibberflux krinkleton.', now(), now(), true);
