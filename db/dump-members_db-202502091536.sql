--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-09 15:36:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 4875 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16437)
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    owner_id integer,
    task character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16436)
-- Name: message_msg_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.tasks ALTER COLUMN task_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.message_msg_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16410)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    full_name character varying(255),
    role_id integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16409)
-- Name: newtable_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.newtable_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16419)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    id integer NOT NULL,
    role_id integer NOT NULL,
    role character varying(255)
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16418)
-- Name: user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_roles ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4869 (class 0 OID 16437)
-- Dependencies: 222
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tasks OVERRIDING SYSTEM VALUE VALUES (36, 1, 'Reverend Insanity', '2025-02-09 10:44:57.355644+08');
INSERT INTO public.tasks OVERRIDING SYSTEM VALUE VALUES (40, 46, 'Mark the worst', '2025-02-09 11:26:50.487002+08');
INSERT INTO public.tasks OVERRIDING SYSTEM VALUE VALUES (38, 2, 'John the great', '2025-02-09 10:59:28.389592+08');
INSERT INTO public.tasks OVERRIDING SYSTEM VALUE VALUES (42, 1, 'Gusion Main', '2025-02-09 15:33:09.678019+08');


--
-- TOC entry 4867 (class 0 OID 16419)
-- Dependencies: 220
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (1, 1, 'admin');
INSERT INTO public.user_roles OVERRIDING SYSTEM VALUE VALUES (2, 2, 'employee');


--
-- TOC entry 4865 (class 0 OID 16410)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (2, 'john', '$2a$10$I0129Od0JritAYXyXZiLqemkcGe6yE5AIA0NiJmDNdgx2KIKFFqse', 'john gusion', 2);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (1, 'andrei', '$2a$10$I0129Od0JritAYXyXZiLqemkcGe6yE5AIA0NiJmDNdgx2KIKFFqse', 'andrei pogi', 1);
INSERT INTO public.users OVERRIDING SYSTEM VALUE VALUES (46, 'klein', '$2a$10$I0129Od0JritAYXyXZiLqemkcGe6yE5AIA0NiJmDNdgx2KIKFFqse', 'klein moratti', 2);


--
-- TOC entry 4876 (class 0 OID 0)
-- Dependencies: 221
-- Name: message_msg_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.message_msg_id_seq', 42, true);


--
-- TOC entry 4877 (class 0 OID 0)
-- Dependencies: 217
-- Name: newtable_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.newtable_user_id_seq', 48, true);


--
-- TOC entry 4878 (class 0 OID 0)
-- Dependencies: 219
-- Name: user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_id_seq', 3, true);


--
-- TOC entry 4716 (class 2606 OID 16441)
-- Name: tasks message_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT message_pk PRIMARY KEY (task_id);


--
-- TOC entry 4708 (class 2606 OID 16414)
-- Name: users newtable_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT newtable_pk PRIMARY KEY (user_id);


--
-- TOC entry 4712 (class 2606 OID 16423)
-- Name: user_roles user_roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pk PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 16425)
-- Name: user_roles user_roles_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_unique UNIQUE (role_id);


--
-- TOC entry 4710 (class 2606 OID 16449)
-- Name: users users_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_unique UNIQUE (username);


--
-- TOC entry 4718 (class 2606 OID 16442)
-- Name: tasks message_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT message_users_fk FOREIGN KEY (owner_id) REFERENCES public.users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 4717 (class 2606 OID 16431)
-- Name: users users_user_roles_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_roles_fk FOREIGN KEY (role_id) REFERENCES public.user_roles(role_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2025-02-09 15:36:44

--
-- PostgreSQL database dump complete
--

