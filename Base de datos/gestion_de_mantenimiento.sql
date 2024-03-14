PGDMP     '                    |            gestion_de_mantenimiento    14.10    14.10 h    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    25242    gestion_de_mantenimiento    DATABASE     t   CREATE DATABASE gestion_de_mantenimiento WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
 (   DROP DATABASE gestion_de_mantenimiento;
                postgres    false            �            1259    25243    id_aprendiz_seq    SEQUENCE        CREATE SEQUENCE public.id_aprendiz_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_aprendiz_seq;
       public          postgres    false            �            1259    25244 
   aprendices    TABLE     w  CREATE TABLE public.aprendices (
    id_aprendiz integer DEFAULT nextval('public.id_aprendiz_seq'::regclass) NOT NULL,
    tipo_doc_aprendiz character varying(50) NOT NULL,
    num_doc_aprendiz integer NOT NULL,
    ficha_aprendiz integer NOT NULL,
    programa_aprendiz character varying(100) NOT NULL,
    nombre_aprendiz character varying(100) NOT NULL,
    email_aprendiz character varying(50) NOT NULL,
    equipo_aprendiz character varying(20) NOT NULL,
    password_aprendiz character varying(20) NOT NULL,
    id_instructor integer,
    telefono_aprendiz character varying(10) NOT NULL,
    estado character varying(10)
);
    DROP TABLE public.aprendices;
       public         heap    postgres    false    209            �            1259    25248    id_caracteristicas_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 5   DROP SEQUENCE public.id_caracteristicas_maquina_seq;
       public          postgres    false            �            1259    25249    caracteristicas_maquina    TABLE     �  CREATE TABLE public.caracteristicas_maquina (
    id_caracteristicas_maquina integer DEFAULT nextval('public.id_caracteristicas_maquina_seq'::regclass) NOT NULL,
    nombre_caracteristica character varying(150),
    funcion_maquina character varying(300),
    imagen_maquina character varying(500),
    id_caracteristicas_motor integer,
    id_hoja_de_vida integer,
    id_descripcion_del_equipo_hv integer,
    id_maquina integer,
    descripcion_caracteristica character varying(150)
);
 +   DROP TABLE public.caracteristicas_maquina;
       public         heap    postgres    false    211            �            1259    25255    id_caracteristicas_motor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_motor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_caracteristicas_motor_seq;
       public          postgres    false            �            1259    25256    caracteristicas_motor    TABLE     {  CREATE TABLE public.caracteristicas_motor (
    id_caracteristicas_motor integer DEFAULT nextval('public.id_caracteristicas_motor_seq'::regclass) NOT NULL,
    marca_motor character varying(100) NOT NULL,
    modelo_motor character varying(100) NOT NULL,
    descripcion_motor character varying(150) NOT NULL,
    serie_motor character varying(150) NOT NULL,
    "tamaño_motor" character varying(100) NOT NULL,
    potencia_motor character varying(100) NOT NULL,
    rpm_motor character varying(100) NOT NULL,
    voltaje_motor character varying(100) NOT NULL,
    amp_motor character varying(100) NOT NULL,
    id_maquina integer
);
 )   DROP TABLE public.caracteristicas_motor;
       public         heap    postgres    false    213            �            1259    25262    id_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 '   DROP SEQUENCE public.id_checklist_seq;
       public          postgres    false            �            1259    25263 	   checklist    TABLE     $  CREATE TABLE public.checklist (
    id_checklist integer DEFAULT nextval('public.id_checklist_seq'::regclass) NOT NULL,
    estado_componente character varying(50) NOT NULL,
    id_componente integer,
    num_inspeccion integer,
    fecha date,
    hora_inicio time without time zone,
    hora_fin time without time zone,
    id_maquina integer,
    ficha_aprendiz integer,
    operario character varying,
    num_doc_aprendiz integer,
    programa_aprendiz character varying,
    equipo_aprendiz integer,
    observacion character varying(250)
);
    DROP TABLE public.checklist;
       public         heap    postgres    false    215            �            1259    25267    id_componentes_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_componentes_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_componentes_checklist_seq;
       public          postgres    false            �            1259    25268    componentes_checklist    TABLE       CREATE TABLE public.componentes_checklist (
    id_componente integer DEFAULT nextval('public.id_componentes_checklist_seq'::regclass) NOT NULL,
    tipo_componente character varying(50) NOT NULL,
    nombre_componente character varying(50) NOT NULL,
    id_maquina integer
);
 )   DROP TABLE public.componentes_checklist;
       public         heap    postgres    false    217            �            1259    25272     id_descripcion_del_equipo_hv_seq    SEQUENCE     �   CREATE SEQUENCE public.id_descripcion_del_equipo_hv_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 7   DROP SEQUENCE public.id_descripcion_del_equipo_hv_seq;
       public          postgres    false            �            1259    25273    descripcion_del_equipo_hv    TABLE     v  CREATE TABLE public.descripcion_del_equipo_hv (
    id_descripcion_del_equipo_hv integer DEFAULT nextval('public.id_descripcion_del_equipo_hv_seq'::regclass) NOT NULL,
    nombre_equipo character varying(150) NOT NULL,
    marca_equipo character varying(150) NOT NULL,
    fecha_fabricacion_equipo date NOT NULL,
    fabricante_equipo character varying(150) NOT NULL,
    ubicacion_equipo character varying(300) NOT NULL,
    caracteristicas_equipo character varying(500) NOT NULL,
    codigo_equipo character varying(150) NOT NULL,
    modelo_equipo character varying(150) NOT NULL,
    num_serie_equipo character varying(100) NOT NULL,
    prioridad_equipo character varying(50) NOT NULL,
    voltaje_equipo character varying(50) NOT NULL,
    corriente_equipo character varying(50) NOT NULL,
    frecuencia_equipo character varying(50) NOT NULL,
    capacidad_equipo character varying(50) NOT NULL,
    peso_equipo character varying(50) NOT NULL,
    alimentacion_equipo character varying(50) NOT NULL,
    sistema_electrico_equipo character varying(50) NOT NULL,
    sistema_electronico_equipo character varying(50) NOT NULL,
    sistema_mecanico_equipo character varying(50) NOT NULL,
    sistema_neumatico_equipo character varying(50) NOT NULL,
    sistema_hidraulico_equipo character varying(50) NOT NULL,
    sistema_termico_equipo character varying(50) NOT NULL,
    id_maquina integer
);
 -   DROP TABLE public.descripcion_del_equipo_hv;
       public         heap    postgres    false    219            �            1259    25279    id_historial_reparaciones_seq    SEQUENCE     �   CREATE SEQUENCE public.id_historial_reparaciones_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 4   DROP SEQUENCE public.id_historial_reparaciones_seq;
       public          postgres    false            �            1259    25280    historial_reparaciones    TABLE     �  CREATE TABLE public.historial_reparaciones (
    id_historial_reparaciones integer DEFAULT nextval('public.id_historial_reparaciones_seq'::regclass) NOT NULL,
    procedimiento_historial character varying(500) NOT NULL,
    insumos_usados_historial character varying(500) NOT NULL,
    observaciones_historial character varying(500) NOT NULL,
    fecha_historial date NOT NULL,
    id_hoja_de_vida integer,
    id_maquina integer
);
 *   DROP TABLE public.historial_reparaciones;
       public         heap    postgres    false    221            �            1259    25286    id_hoja_de_vida_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_de_vida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_hoja_de_vida_seq;
       public          postgres    false            �            1259    25287    hoja_de_vida    TABLE     g  CREATE TABLE public.hoja_de_vida (
    id_hoja_de_vida integer DEFAULT nextval('public.id_hoja_de_vida_seq'::regclass) NOT NULL,
    id_caracteristicas_maquina integer NOT NULL,
    id_caracteristicas_motor integer NOT NULL,
    id_descripcion_del_equipo_hv integer NOT NULL,
    id_historial_reparaciones integer NOT NULL,
    id_maquina integer NOT NULL
);
     DROP TABLE public.hoja_de_vida;
       public         heap    postgres    false    223            �            1259    25291    id_hoja_inspeccion_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_inspeccion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 -   DROP SEQUENCE public.id_hoja_inspeccion_seq;
       public          postgres    false            �            1259    25292    hoja_inspeccion    TABLE       CREATE TABLE public.hoja_inspeccion (
    id_inspeccion integer DEFAULT nextval('public.id_hoja_inspeccion_seq'::regclass) NOT NULL,
    fecha date NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    id_aprendiz integer
);
 #   DROP TABLE public.hoja_inspeccion;
       public         heap    postgres    false    225            �            1259    25296    instructores    TABLE     @  CREATE TABLE public.instructores (
    id_instructor integer NOT NULL,
    cc_instructor integer NOT NULL,
    nombre_instructor character varying(100) NOT NULL,
    email_instructor character varying(50) NOT NULL,
    password_instructor character varying(20) NOT NULL,
    telefono_instructor character varying(10)
);
     DROP TABLE public.instructores;
       public         heap    postgres    false            �            1259    25299    id_instructor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_instructor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 (   DROP SEQUENCE public.id_instructor_seq;
       public          postgres    false    227            �           0    0    id_instructor_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.id_instructor_seq OWNED BY public.instructores.id_instructor;
          public          postgres    false    228            �            1259    25300    id_insumos_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 %   DROP SEQUENCE public.id_insumos_seq;
       public          postgres    false            �            1259    25301    id_insumos_usados_ot_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_usados_ot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 /   DROP SEQUENCE public.id_insumos_usados_ot_seq;
       public          postgres    false            �            1259    25302    id_maquinas_seq    SEQUENCE     �   CREATE SEQUENCE public.id_maquinas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_maquinas_seq;
       public          postgres    false            �            1259    25303    id_orden_de_trabajo_seq    SEQUENCE     �   CREATE SEQUENCE public.id_orden_de_trabajo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 .   DROP SEQUENCE public.id_orden_de_trabajo_seq;
       public          postgres    false            �            1259    25304    id_tipo_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_tipo_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_tipo_maquina_seq;
       public          postgres    false            �            1259    25305    insumos    TABLE     �  CREATE TABLE public.insumos (
    id_insumos integer DEFAULT nextval('public.id_insumos_seq'::regclass) NOT NULL,
    nombre_insumo character varying(150) NOT NULL,
    fecha_llegada_insumo date NOT NULL,
    cantidad_insumo integer NOT NULL,
    proveedor_insumo character varying(150) NOT NULL,
    insumos_en_uso integer,
    tipo character varying(20),
    nota_insumo character varying(200)
);
    DROP TABLE public.insumos;
       public         heap    postgres    false    229            �            1259    25309    insumos_usados_ot    TABLE        CREATE TABLE public.insumos_usados_ot (
    insumos_usados_ot integer DEFAULT nextval('public.id_insumos_usados_ot_seq'::regclass) NOT NULL,
    nombre_insumo_ot character varying(150) NOT NULL,
    cantidad_insumo_ot integer NOT NULL,
    unidad_insumo_ot character varying(20) NOT NULL,
    valor_insumo_ot integer NOT NULL,
    subtotal_insumo_ot integer NOT NULL,
    total_precio_insumo_ot integer NOT NULL,
    origen_insumo_ot character varying(150) NOT NULL,
    id_orden_de_trabajo integer NOT NULL,
    id_insumos integer NOT NULL
);
 %   DROP TABLE public.insumos_usados_ot;
       public         heap    postgres    false    230            �            1259    25313    maquinas    TABLE     �   CREATE TABLE public.maquinas (
    id_maquina integer DEFAULT nextval('public.id_maquinas_seq'::regclass) NOT NULL,
    nombre_maquina character varying(100) NOT NULL,
    manual_maquina character varying(450),
    id_tipo_maquina integer
);
    DROP TABLE public.maquinas;
       public         heap    postgres    false    231            �            1259    25319    orden_de_trabajo    TABLE     �  CREATE TABLE public.orden_de_trabajo (
    id_orden_de_trabajo integer DEFAULT nextval('public.id_orden_de_trabajo_seq'::regclass) NOT NULL,
    fecha_inicio_ot date NOT NULL,
    hora_inicio_ot time without time zone NOT NULL,
    fecha_fin_ot date NOT NULL,
    hora_fin_ot time without time zone NOT NULL,
    total_horas_ot bigint NOT NULL,
    precio_hora integer NOT NULL,
    total_mano_obra integer NOT NULL,
    tipo_de_trabajo character varying(150) NOT NULL,
    tipo_de_mantenimiento character varying(150) NOT NULL,
    tipo_de_sistema character varying(150) NOT NULL,
    descripcion_de_trabajo character varying(1000) NOT NULL,
    subtotal_ot integer NOT NULL,
    iva integer NOT NULL,
    total_precio_horas integer NOT NULL,
    costo_mantenimiento integer NOT NULL,
    id_maquina integer NOT NULL,
    id_aprendiz integer NOT NULL,
    programa_formacion_ot character varying(100),
    ficha_ot integer,
    operarios_ot character varying[]
);
 $   DROP TABLE public.orden_de_trabajo;
       public         heap    postgres    false    232            �            1259    25325    tipo_maquina    TABLE     �   CREATE TABLE public.tipo_maquina (
    id_tipo_maquina integer DEFAULT nextval('public.id_tipo_maquina_seq'::regclass) NOT NULL,
    nombre_tipo_maquina character varying(50) NOT NULL,
    descripcion_tipo_maquina character varying(300) NOT NULL
);
     DROP TABLE public.tipo_maquina;
       public         heap    postgres    false    233            �           2604    25329    instructores id_instructor    DEFAULT     {   ALTER TABLE ONLY public.instructores ALTER COLUMN id_instructor SET DEFAULT nextval('public.id_instructor_seq'::regclass);
 I   ALTER TABLE public.instructores ALTER COLUMN id_instructor DROP DEFAULT;
       public          postgres    false    228    227            q          0    25244 
   aprendices 
   TABLE DATA           �   COPY public.aprendices (id_aprendiz, tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, equipo_aprendiz, password_aprendiz, id_instructor, telefono_aprendiz, estado) FROM stdin;
    public          postgres    false    210   |�       s          0    25249    caracteristicas_maquina 
   TABLE DATA           �   COPY public.caracteristicas_maquina (id_caracteristicas_maquina, nombre_caracteristica, funcion_maquina, imagen_maquina, id_caracteristicas_motor, id_hoja_de_vida, id_descripcion_del_equipo_hv, id_maquina, descripcion_caracteristica) FROM stdin;
    public          postgres    false    212   0�       u          0    25256    caracteristicas_motor 
   TABLE DATA           �   COPY public.caracteristicas_motor (id_caracteristicas_motor, marca_motor, modelo_motor, descripcion_motor, serie_motor, "tamaño_motor", potencia_motor, rpm_motor, voltaje_motor, amp_motor, id_maquina) FROM stdin;
    public          postgres    false    214   i�       w          0    25263 	   checklist 
   TABLE DATA           �   COPY public.checklist (id_checklist, estado_componente, id_componente, num_inspeccion, fecha, hora_inicio, hora_fin, id_maquina, ficha_aprendiz, operario, num_doc_aprendiz, programa_aprendiz, equipo_aprendiz, observacion) FROM stdin;
    public          postgres    false    216   ��       y          0    25268    componentes_checklist 
   TABLE DATA           n   COPY public.componentes_checklist (id_componente, tipo_componente, nombre_componente, id_maquina) FROM stdin;
    public          postgres    false    218   C�       {          0    25273    descripcion_del_equipo_hv 
   TABLE DATA             COPY public.descripcion_del_equipo_hv (id_descripcion_del_equipo_hv, nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo, id_maquina) FROM stdin;
    public          postgres    false    220   ��       }          0    25280    historial_reparaciones 
   TABLE DATA           �   COPY public.historial_reparaciones (id_historial_reparaciones, procedimiento_historial, insumos_usados_historial, observaciones_historial, fecha_historial, id_hoja_de_vida, id_maquina) FROM stdin;
    public          postgres    false    222   ��                 0    25287    hoja_de_vida 
   TABLE DATA           �   COPY public.hoja_de_vida (id_hoja_de_vida, id_caracteristicas_maquina, id_caracteristicas_motor, id_descripcion_del_equipo_hv, id_historial_reparaciones, id_maquina) FROM stdin;
    public          postgres    false    224   @�       �          0    25292    hoja_inspeccion 
   TABLE DATA           c   COPY public.hoja_inspeccion (id_inspeccion, fecha, hora_inicio, hora_fin, id_aprendiz) FROM stdin;
    public          postgres    false    226   ]�       �          0    25296    instructores 
   TABLE DATA           �   COPY public.instructores (id_instructor, cc_instructor, nombre_instructor, email_instructor, password_instructor, telefono_instructor) FROM stdin;
    public          postgres    false    227   z�       �          0    25305    insumos 
   TABLE DATA           �   COPY public.insumos (id_insumos, nombre_insumo, fecha_llegada_insumo, cantidad_insumo, proveedor_insumo, insumos_en_uso, tipo, nota_insumo) FROM stdin;
    public          postgres    false    234   ƪ       �          0    25309    insumos_usados_ot 
   TABLE DATA           �   COPY public.insumos_usados_ot (insumos_usados_ot, nombre_insumo_ot, cantidad_insumo_ot, unidad_insumo_ot, valor_insumo_ot, subtotal_insumo_ot, total_precio_insumo_ot, origen_insumo_ot, id_orden_de_trabajo, id_insumos) FROM stdin;
    public          postgres    false    235   N�       �          0    25313    maquinas 
   TABLE DATA           _   COPY public.maquinas (id_maquina, nombre_maquina, manual_maquina, id_tipo_maquina) FROM stdin;
    public          postgres    false    236   ǫ       �          0    25319    orden_de_trabajo 
   TABLE DATA           }  COPY public.orden_de_trabajo (id_orden_de_trabajo, fecha_inicio_ot, hora_inicio_ot, fecha_fin_ot, hora_fin_ot, total_horas_ot, precio_hora, total_mano_obra, tipo_de_trabajo, tipo_de_mantenimiento, tipo_de_sistema, descripcion_de_trabajo, subtotal_ot, iva, total_precio_horas, costo_mantenimiento, id_maquina, id_aprendiz, programa_formacion_ot, ficha_ot, operarios_ot) FROM stdin;
    public          postgres    false    237   ��       �          0    25325    tipo_maquina 
   TABLE DATA           f   COPY public.tipo_maquina (id_tipo_maquina, nombre_tipo_maquina, descripcion_tipo_maquina) FROM stdin;
    public          postgres    false    238   �       �           0    0    id_aprendiz_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.id_aprendiz_seq', 25, true);
          public          postgres    false    209            �           0    0    id_caracteristicas_maquina_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.id_caracteristicas_maquina_seq', 29, true);
          public          postgres    false    211            �           0    0    id_caracteristicas_motor_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.id_caracteristicas_motor_seq', 6, true);
          public          postgres    false    213            �           0    0    id_checklist_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.id_checklist_seq', 158, true);
          public          postgres    false    215            �           0    0    id_componentes_checklist_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_componentes_checklist_seq', 30, true);
          public          postgres    false    217            �           0    0     id_descripcion_del_equipo_hv_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.id_descripcion_del_equipo_hv_seq', 6, true);
          public          postgres    false    219            �           0    0    id_historial_reparaciones_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_historial_reparaciones_seq', 8, true);
          public          postgres    false    221            �           0    0    id_hoja_de_vida_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_hoja_de_vida_seq', 1, false);
          public          postgres    false    223            �           0    0    id_hoja_inspeccion_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.id_hoja_inspeccion_seq', 13, true);
          public          postgres    false    225            �           0    0    id_instructor_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.id_instructor_seq', 6, true);
          public          postgres    false    228            �           0    0    id_insumos_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_insumos_seq', 49, true);
          public          postgres    false    229            �           0    0    id_insumos_usados_ot_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.id_insumos_usados_ot_seq', 10, true);
          public          postgres    false    230            �           0    0    id_maquinas_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_maquinas_seq', 9, true);
          public          postgres    false    231            �           0    0    id_orden_de_trabajo_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.id_orden_de_trabajo_seq', 18, true);
          public          postgres    false    232            �           0    0    id_tipo_maquina_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_tipo_maquina_seq', 19, true);
          public          postgres    false    233            �           2606    25331    aprendices aprendices_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT aprendices_pkey PRIMARY KEY (id_aprendiz);
 D   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT aprendices_pkey;
       public            postgres    false    210            �           2606    25333 4   caracteristicas_maquina caracteristicas_maquina_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_pkey PRIMARY KEY (id_caracteristicas_maquina);
 ^   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_pkey;
       public            postgres    false    212            �           2606    25335 0   caracteristicas_motor caracteristicas_motor_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_motor
    ADD CONSTRAINT caracteristicas_motor_pkey PRIMARY KEY (id_caracteristicas_motor);
 Z   ALTER TABLE ONLY public.caracteristicas_motor DROP CONSTRAINT caracteristicas_motor_pkey;
       public            postgres    false    214            �           2606    25337    checklist checklist_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_pkey PRIMARY KEY (id_checklist);
 B   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_pkey;
       public            postgres    false    216            �           2606    25339 0   componentes_checklist componentes_checklist_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.componentes_checklist
    ADD CONSTRAINT componentes_checklist_pkey PRIMARY KEY (id_componente);
 Z   ALTER TABLE ONLY public.componentes_checklist DROP CONSTRAINT componentes_checklist_pkey;
       public            postgres    false    218            �           2606    25341 8   descripcion_del_equipo_hv descripcion_del_equipo_hv_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.descripcion_del_equipo_hv
    ADD CONSTRAINT descripcion_del_equipo_hv_pkey PRIMARY KEY (id_descripcion_del_equipo_hv);
 b   ALTER TABLE ONLY public.descripcion_del_equipo_hv DROP CONSTRAINT descripcion_del_equipo_hv_pkey;
       public            postgres    false    220            �           2606    25343 2   historial_reparaciones historial_reparaciones_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_pkey PRIMARY KEY (id_historial_reparaciones);
 \   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_pkey;
       public            postgres    false    222            �           2606    25345    hoja_de_vida hoja_de_vida_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_pkey PRIMARY KEY (id_hoja_de_vida);
 H   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_pkey;
       public            postgres    false    224            �           2606    25347 $   hoja_inspeccion hoja_inspeccion_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_pkey PRIMARY KEY (id_inspeccion);
 N   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_pkey;
       public            postgres    false    226            �           2606    25349    instructores instructores_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.instructores
    ADD CONSTRAINT instructores_pkey PRIMARY KEY (id_instructor);
 H   ALTER TABLE ONLY public.instructores DROP CONSTRAINT instructores_pkey;
       public            postgres    false    227            �           2606    25351    insumos insumos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT insumos_pkey PRIMARY KEY (id_insumos);
 >   ALTER TABLE ONLY public.insumos DROP CONSTRAINT insumos_pkey;
       public            postgres    false    234            �           2606    25353 (   insumos_usados_ot insumos_usados_ot_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_pkey PRIMARY KEY (insumos_usados_ot);
 R   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_pkey;
       public            postgres    false    235            �           2606    25355    maquinas maquinas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_pkey PRIMARY KEY (id_maquina);
 @   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_pkey;
       public            postgres    false    236            �           2606    25357 &   orden_de_trabajo orden_de_trabajo_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_pkey PRIMARY KEY (id_orden_de_trabajo);
 P   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_pkey;
       public            postgres    false    237            �           2606    25359    tipo_maquina tipo_maquina_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.tipo_maquina
    ADD CONSTRAINT tipo_maquina_pkey PRIMARY KEY (id_tipo_maquina);
 H   ALTER TABLE ONLY public.tipo_maquina DROP CONSTRAINT tipo_maquina_pkey;
       public            postgres    false    238            �           2606    25360 M   caracteristicas_maquina caracteristicas_maquina_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 w   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey;
       public          postgres    false    214    212    3254            �           2606    25365 Q   caracteristicas_maquina caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 {   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    220    212    3260            �           2606    25370 D   caracteristicas_maquina caracteristicas_maquina_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 n   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey;
       public          postgres    false    212    3264    224            �           2606    25375 ?   caracteristicas_maquina caracteristicas_maquina_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 i   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_maquina_fkey;
       public          postgres    false    212    3274    236            �           2606    25380 ;   caracteristicas_motor caracteristicas_motor_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_motor
    ADD CONSTRAINT caracteristicas_motor_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 e   ALTER TABLE ONLY public.caracteristicas_motor DROP CONSTRAINT caracteristicas_motor_id_maquina_fkey;
       public          postgres    false    3274    236    214            �           2606    25385 &   checklist checklist_id_componente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_componente_fkey FOREIGN KEY (id_componente) REFERENCES public.componentes_checklist(id_componente) NOT VALID;
 P   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_componente_fkey;
       public          postgres    false    216    218    3258            �           2606    25390 #   checklist checklist_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 M   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_maquina_fkey;
       public          postgres    false    3274    216    236            �           2606    25395 ;   componentes_checklist componentes_checklist_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.componentes_checklist
    ADD CONSTRAINT componentes_checklist_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 e   ALTER TABLE ONLY public.componentes_checklist DROP CONSTRAINT componentes_checklist_id_maquina_fkey;
       public          postgres    false    218    236    3274            �           2606    25400 C   descripcion_del_equipo_hv descripcion_del_equipo_hv_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.descripcion_del_equipo_hv
    ADD CONSTRAINT descripcion_del_equipo_hv_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 m   ALTER TABLE ONLY public.descripcion_del_equipo_hv DROP CONSTRAINT descripcion_del_equipo_hv_id_maquina_fkey;
       public          postgres    false    3274    236    220            �           2606    25405 B   historial_reparaciones historial_reparaciones_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 l   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey;
       public          postgres    false    3264    222    224            �           2606    25410 =   historial_reparaciones historial_reparaciones_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 g   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_id_maquina_fkey;
       public          postgres    false    3274    236    222            �           2606    25415 9   hoja_de_vida hoja_de_vida_id_caracteristicas_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey FOREIGN KEY (id_caracteristicas_maquina) REFERENCES public.caracteristicas_maquina(id_caracteristicas_maquina) NOT VALID;
 c   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey;
       public          postgres    false    224    3252    212            �           2606    25420 7   hoja_de_vida hoja_de_vida_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 a   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey;
       public          postgres    false    224    3254    214            �           2606    25425 ;   hoja_de_vida hoja_de_vida_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 e   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    220    224    3260            �           2606    25430 8   hoja_de_vida hoja_de_vida_id_historial_reparaciones_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey FOREIGN KEY (id_historial_reparaciones) REFERENCES public.historial_reparaciones(id_historial_reparaciones) NOT VALID;
 b   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey;
       public          postgres    false    3262    222    224            �           2606    25435 )   hoja_de_vida hoja_de_vida_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina);
 S   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_maquina_fkey;
       public          postgres    false    224    3274    236            �           2606    25440 0   hoja_inspeccion hoja_inspeccion_id_aprendiz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_id_aprendiz_fkey FOREIGN KEY (id_aprendiz) REFERENCES public.aprendices(id_aprendiz);
 Z   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_id_aprendiz_fkey;
       public          postgres    false    226    210    3250            �           2606    25445 '   aprendices instructor registra aprendiz    FK CONSTRAINT     �   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT "instructor registra aprendiz" FOREIGN KEY (id_instructor) REFERENCES public.instructores(id_instructor) NOT VALID;
 S   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT "instructor registra aprendiz";
       public          postgres    false    210    3268    227            �           0    0 7   CONSTRAINT "instructor registra aprendiz" ON aprendices    COMMENT     m   COMMENT ON CONSTRAINT "instructor registra aprendiz" ON public.aprendices IS 'instructor registra aprendiz';
          public          postgres    false    3279            �           2606    25450 3   insumos_usados_ot insumos_usados_ot_id_insumos_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_insumos_fkey FOREIGN KEY (id_insumos) REFERENCES public.insumos(id_insumos) NOT VALID;
 ]   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_insumos_fkey;
       public          postgres    false    3270    234    235            �           2606    25455 <   insumos_usados_ot insumos_usados_ot_id_orden_de_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey FOREIGN KEY (id_orden_de_trabajo) REFERENCES public.orden_de_trabajo(id_orden_de_trabajo) NOT VALID;
 f   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey;
       public          postgres    false    235    237    3276            �           2606    25460 &   maquinas maquinas_id_tipo_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_id_tipo_maquina_fkey FOREIGN KEY (id_tipo_maquina) REFERENCES public.tipo_maquina(id_tipo_maquina) NOT VALID;
 P   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_id_tipo_maquina_fkey;
       public          postgres    false    236    238    3278            �           2606    25470 1   orden_de_trabajo orden_de_trabajo_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 [   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_id_maquina_fkey;
       public          postgres    false    236    3274    237            q   �   x�u�1�0��9ENP5i`C������J��RK�2p����Eb��`�˶���eSB��i
����umgܖٗ�xd��Xj,�)���c����-$�]�ǌ���Z�0\�S�s��IY@_��Bۿ����y{�ѯ�|�m0����~��!>�Km      s   )   x�3��L,Na*NL��C K��.#KB���\1z\\\ ��#      u      x�3�L,N��D(Fb°%W� �      w   �  x�͘=��0�k�����v�"�*�6�-$lʡ�b��2�|��2��26���a�a�}�Ӑz��&߇�wDX`B=1���r���RQ��Z�gwl��µ8t�E�]~��������ӣ�}��c��>���|��(�`�
0�`�� `� �F0�&���06��i�Q̌05�T&���*��<̂�
`��&�Єޅ���q����a��w���Vd�	���0	6��)�� �]aⶇLE���Xg���
��0��Vd�Y���l,Z�[����0F��I��z�[uk��� S`cy���
�8�B)�<����5����d�"��r�evM����ٌ�q2ZW$��Ōc�M���Cs�
44Ȭ@C���0S.0�hh�Y��f�hh��jFS[�� +����+
��7I(4t�M \/��4B�����޵�~BrJ�֟�0��.įGI1;�L�h,�%��?7KI3If�5K�+�P�_�V�v�
��
}�܋G/��Y�I�����j�Z	�۸�Ԕ��I�џ�5ʢ|�S%�(s�z!�u�Տ�Q��#��sA��^��c���x@�S\Z!���9�Sh��=Eę����v������]��}w��4��:�>����@..�_C�]<�
/��y�.�{<�����D���      y   g   x�m���0kj
Nvׁ� !}!@!eR�� �����m�n
�!����~�a���Us����e�=�.�&���*��~}�6�����H)�7�(�      {   5   x�3�L,N�"##]c]3���D8��
($$f����� c�h      }   1   x�3�L,N���bN##]c]C#�?NK.δ�4NF������ ��            x������ � �      �      x������ � �      �   <   x�3�442�t�K��S�--�����L��s3s���s99�-LM�LM��b���� ��      �   x   x�M�9�0��S� �x�Hr :8A��Ȗ�H�}HG3�3~���
��W�)�a�)� �X��+2���a�*���;�&���tVi�m�mn~ŃZ�)�f\��[���S�~B|""�      �   i   x�m��
�  ���0�t��K�],�޿�$�1��>�ð��]�q>�VJ�B�p�S9��blg��7���1\⏘�5�o��(R�p�T��j��e@��57*      �   "   x����,.��S0���W�H��4������� d��      �     x����r� ���)���@H���[�=����%�"9�f�@=��b�E�-��L:��c�X�j��	�d&�M�߈���.n�,��������騍�5�#��Z�30h�њ�Z���5����VRsˤb�^~�����s�� �:~�E��bO��v�st��/!��|p�S��v��_�7-�~^?�����jU-g1���j-S;���A�N|cO�8bh�=��"e@�rJD���-^��}sB̯p
�7�C5U�*j�{��A��;:�N»�Q���J}��wu�2����M��Nj�	
"��~�	�$������܄Q��]�������
�8|�h�MO5�l�bA%�bizu��*P4k�]�~Q�"<��3G�❩�l_�S�3�\.J�k)�K>�N%��=F��o���h01MsUv1���ϵ0W84IY#���瓢e�f�/��<����������vܩ)өc%%���0����j�{���      �      x�3���/��/�,�,N����� >�c     