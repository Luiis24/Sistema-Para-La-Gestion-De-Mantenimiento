PGDMP         $                |            gestion_de_mantenimiento    15.5    15.5 h    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17455    gestion_de_mantenimiento    DATABASE     �   CREATE DATABASE gestion_de_mantenimiento WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
 (   DROP DATABASE gestion_de_mantenimiento;
                postgres    false            �            1259    17456    id_aprendiz_seq    SEQUENCE        CREATE SEQUENCE public.id_aprendiz_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_aprendiz_seq;
       public          postgres    false            �            1259    17457 
   aprendices    TABLE     U  CREATE TABLE public.aprendices (
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
    telefono_aprendiz character varying(10) NOT NULL
);
    DROP TABLE public.aprendices;
       public         heap    postgres    false    214            �            1259    17461    id_caracteristicas_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 5   DROP SEQUENCE public.id_caracteristicas_maquina_seq;
       public          postgres    false            �            1259    17462    caracteristicas_maquina    TABLE     �  CREATE TABLE public.caracteristicas_maquina (
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
       public         heap    postgres    false    216            �            1259    17468    id_caracteristicas_motor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_motor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_caracteristicas_motor_seq;
       public          postgres    false            �            1259    17469    caracteristicas_motor    TABLE     {  CREATE TABLE public.caracteristicas_motor (
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
       public         heap    postgres    false    218            �            1259    17475    id_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 '   DROP SEQUENCE public.id_checklist_seq;
       public          postgres    false            �            1259    17476 	   checklist    TABLE     �   CREATE TABLE public.checklist (
    id_checklist integer DEFAULT nextval('public.id_checklist_seq'::regclass) NOT NULL,
    estado_componente character varying(50) NOT NULL,
    id_componente integer,
    id_inspeccion integer
);
    DROP TABLE public.checklist;
       public         heap    postgres    false    220            �            1259    17480    id_componentes_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_componentes_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_componentes_checklist_seq;
       public          postgres    false            �            1259    17481    componentes_checklist    TABLE     �   CREATE TABLE public.componentes_checklist (
    id_componente integer DEFAULT nextval('public.id_componentes_checklist_seq'::regclass) NOT NULL,
    tipo_componente character varying(50) NOT NULL,
    nombre_componente character varying(50) NOT NULL
);
 )   DROP TABLE public.componentes_checklist;
       public         heap    postgres    false    222            �            1259    17485     id_descripcion_del_equipo_hv_seq    SEQUENCE     �   CREATE SEQUENCE public.id_descripcion_del_equipo_hv_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 7   DROP SEQUENCE public.id_descripcion_del_equipo_hv_seq;
       public          postgres    false            �            1259    17486    descripcion_del_equipo_hv    TABLE     v  CREATE TABLE public.descripcion_del_equipo_hv (
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
       public         heap    postgres    false    224            �            1259    17492    id_historial_reparaciones_seq    SEQUENCE     �   CREATE SEQUENCE public.id_historial_reparaciones_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 4   DROP SEQUENCE public.id_historial_reparaciones_seq;
       public          postgres    false            �            1259    17493    historial_reparaciones    TABLE     �  CREATE TABLE public.historial_reparaciones (
    id_historial_reparaciones integer DEFAULT nextval('public.id_historial_reparaciones_seq'::regclass) NOT NULL,
    procedimiento_historial character varying(500) NOT NULL,
    insumos_usados_historial character varying(500) NOT NULL,
    observaciones_historial character varying(500) NOT NULL,
    fecha_historial date NOT NULL,
    id_hoja_de_vida integer,
    id_maquina integer
);
 *   DROP TABLE public.historial_reparaciones;
       public         heap    postgres    false    226            �            1259    17499    id_hoja_de_vida_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_de_vida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_hoja_de_vida_seq;
       public          postgres    false            �            1259    17500    hoja_de_vida    TABLE     g  CREATE TABLE public.hoja_de_vida (
    id_hoja_de_vida integer DEFAULT nextval('public.id_hoja_de_vida_seq'::regclass) NOT NULL,
    id_caracteristicas_maquina integer NOT NULL,
    id_caracteristicas_motor integer NOT NULL,
    id_descripcion_del_equipo_hv integer NOT NULL,
    id_historial_reparaciones integer NOT NULL,
    id_maquina integer NOT NULL
);
     DROP TABLE public.hoja_de_vida;
       public         heap    postgres    false    228            �            1259    17504    id_hoja_inspeccion_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_inspeccion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 -   DROP SEQUENCE public.id_hoja_inspeccion_seq;
       public          postgres    false            �            1259    17505    hoja_inspeccion    TABLE       CREATE TABLE public.hoja_inspeccion (
    id_inspeccion integer DEFAULT nextval('public.id_hoja_inspeccion_seq'::regclass) NOT NULL,
    fecha date NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    id_aprendiz integer
);
 #   DROP TABLE public.hoja_inspeccion;
       public         heap    postgres    false    230            �            1259    17509    instructores    TABLE     @  CREATE TABLE public.instructores (
    id_instructor integer NOT NULL,
    cc_instructor integer NOT NULL,
    nombre_instructor character varying(100) NOT NULL,
    email_instructor character varying(50) NOT NULL,
    password_instructor character varying(20) NOT NULL,
    telefono_instructor character varying(10)
);
     DROP TABLE public.instructores;
       public         heap    postgres    false            �            1259    17512    id_instructor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_instructor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 (   DROP SEQUENCE public.id_instructor_seq;
       public          postgres    false    232            �           0    0    id_instructor_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.id_instructor_seq OWNED BY public.instructores.id_instructor;
          public          postgres    false    233            �            1259    17513    id_insumos_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 %   DROP SEQUENCE public.id_insumos_seq;
       public          postgres    false            �            1259    17514    id_insumos_usados_ot_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_usados_ot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 /   DROP SEQUENCE public.id_insumos_usados_ot_seq;
       public          postgres    false            �            1259    17515    id_maquinas_seq    SEQUENCE     �   CREATE SEQUENCE public.id_maquinas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_maquinas_seq;
       public          postgres    false            �            1259    17516    id_orden_de_trabajo_seq    SEQUENCE     �   CREATE SEQUENCE public.id_orden_de_trabajo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 .   DROP SEQUENCE public.id_orden_de_trabajo_seq;
       public          postgres    false            �            1259    17517    id_tipo_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_tipo_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_tipo_maquina_seq;
       public          postgres    false            �            1259    17518    insumos    TABLE     G  CREATE TABLE public.insumos (
    id_insumos integer DEFAULT nextval('public.id_insumos_seq'::regclass) NOT NULL,
    nombre_insumo character varying(150) NOT NULL,
    fecha_llegada_insumo date NOT NULL,
    cantidad_insumo integer NOT NULL,
    proveedor_insumo character varying(150) NOT NULL,
    insumos_en_uso integer
);
    DROP TABLE public.insumos;
       public         heap    postgres    false    234            �            1259    17522    insumos_usados_ot    TABLE        CREATE TABLE public.insumos_usados_ot (
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
       public         heap    postgres    false    235            �            1259    17526    maquinas    TABLE     �   CREATE TABLE public.maquinas (
    id_maquina integer DEFAULT nextval('public.id_maquinas_seq'::regclass) NOT NULL,
    nombre_maquina character varying(100) NOT NULL,
    manual_maquina character varying(450),
    id_tipo_maquina integer
);
    DROP TABLE public.maquinas;
       public         heap    postgres    false    236            �            1259    17532    orden_de_trabajo    TABLE     W  CREATE TABLE public.orden_de_trabajo (
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
    id_aprendiz integer NOT NULL
);
 $   DROP TABLE public.orden_de_trabajo;
       public         heap    postgres    false    237            �            1259    17538    tipo_maquina    TABLE     �   CREATE TABLE public.tipo_maquina (
    id_tipo_maquina integer DEFAULT nextval('public.id_tipo_maquina_seq'::regclass) NOT NULL,
    nombre_tipo_maquina character varying(50) NOT NULL,
    descripcion_tipo_maquina character varying(300) NOT NULL
);
     DROP TABLE public.tipo_maquina;
       public         heap    postgres    false    238            �           2604    17542    instructores id_instructor    DEFAULT     {   ALTER TABLE ONLY public.instructores ALTER COLUMN id_instructor SET DEFAULT nextval('public.id_instructor_seq'::regclass);
 I   ALTER TABLE public.instructores ALTER COLUMN id_instructor DROP DEFAULT;
       public          postgres    false    233    232            }          0    17457 
   aprendices 
   TABLE DATA           �   COPY public.aprendices (id_aprendiz, tipo_doc_aprendiz, num_doc_aprendiz, ficha_aprendiz, programa_aprendiz, nombre_aprendiz, email_aprendiz, equipo_aprendiz, password_aprendiz, id_instructor, telefono_aprendiz) FROM stdin;
    public          postgres    false    215   ��                 0    17462    caracteristicas_maquina 
   TABLE DATA           �   COPY public.caracteristicas_maquina (id_caracteristicas_maquina, nombre_caracteristica, funcion_maquina, imagen_maquina, id_caracteristicas_motor, id_hoja_de_vida, id_descripcion_del_equipo_hv, id_maquina, descripcion_caracteristica) FROM stdin;
    public          postgres    false    217   D�       �          0    17469    caracteristicas_motor 
   TABLE DATA           �   COPY public.caracteristicas_motor (id_caracteristicas_motor, marca_motor, modelo_motor, descripcion_motor, serie_motor, "tamaño_motor", potencia_motor, rpm_motor, voltaje_motor, amp_motor, id_maquina) FROM stdin;
    public          postgres    false    219   �       �          0    17476 	   checklist 
   TABLE DATA           b   COPY public.checklist (id_checklist, estado_componente, id_componente, id_inspeccion) FROM stdin;
    public          postgres    false    221   }�       �          0    17481    componentes_checklist 
   TABLE DATA           b   COPY public.componentes_checklist (id_componente, tipo_componente, nombre_componente) FROM stdin;
    public          postgres    false    223   ��       �          0    17486    descripcion_del_equipo_hv 
   TABLE DATA             COPY public.descripcion_del_equipo_hv (id_descripcion_del_equipo_hv, nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo, id_maquina) FROM stdin;
    public          postgres    false    225   �       �          0    17493    historial_reparaciones 
   TABLE DATA           �   COPY public.historial_reparaciones (id_historial_reparaciones, procedimiento_historial, insumos_usados_historial, observaciones_historial, fecha_historial, id_hoja_de_vida, id_maquina) FROM stdin;
    public          postgres    false    227   ��       �          0    17500    hoja_de_vida 
   TABLE DATA           �   COPY public.hoja_de_vida (id_hoja_de_vida, id_caracteristicas_maquina, id_caracteristicas_motor, id_descripcion_del_equipo_hv, id_historial_reparaciones, id_maquina) FROM stdin;
    public          postgres    false    229   A�       �          0    17505    hoja_inspeccion 
   TABLE DATA           c   COPY public.hoja_inspeccion (id_inspeccion, fecha, hora_inicio, hora_fin, id_aprendiz) FROM stdin;
    public          postgres    false    231   ^�       �          0    17509    instructores 
   TABLE DATA           �   COPY public.instructores (id_instructor, cc_instructor, nombre_instructor, email_instructor, password_instructor, telefono_instructor) FROM stdin;
    public          postgres    false    232   ��       �          0    17518    insumos 
   TABLE DATA           �   COPY public.insumos (id_insumos, nombre_insumo, fecha_llegada_insumo, cantidad_insumo, proveedor_insumo, insumos_en_uso) FROM stdin;
    public          postgres    false    239   )�       �          0    17522    insumos_usados_ot 
   TABLE DATA           �   COPY public.insumos_usados_ot (insumos_usados_ot, nombre_insumo_ot, cantidad_insumo_ot, unidad_insumo_ot, valor_insumo_ot, subtotal_insumo_ot, total_precio_insumo_ot, origen_insumo_ot, id_orden_de_trabajo, id_insumos) FROM stdin;
    public          postgres    false    240   Ҩ       �          0    17526    maquinas 
   TABLE DATA           _   COPY public.maquinas (id_maquina, nombre_maquina, manual_maquina, id_tipo_maquina) FROM stdin;
    public          postgres    false    241   �       �          0    17532    orden_de_trabajo 
   TABLE DATA           N  COPY public.orden_de_trabajo (id_orden_de_trabajo, fecha_inicio_ot, hora_inicio_ot, fecha_fin_ot, hora_fin_ot, total_horas_ot, precio_hora, total_mano_obra, tipo_de_trabajo, tipo_de_mantenimiento, tipo_de_sistema, descripcion_de_trabajo, subtotal_ot, iva, total_precio_horas, costo_mantenimiento, id_maquina, id_aprendiz) FROM stdin;
    public          postgres    false    242   b�       �          0    17538    tipo_maquina 
   TABLE DATA           f   COPY public.tipo_maquina (id_tipo_maquina, nombre_tipo_maquina, descripcion_tipo_maquina) FROM stdin;
    public          postgres    false    243   �       �           0    0    id_aprendiz_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.id_aprendiz_seq', 22, true);
          public          postgres    false    214            �           0    0    id_caracteristicas_maquina_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.id_caracteristicas_maquina_seq', 23, true);
          public          postgres    false    216            �           0    0    id_caracteristicas_motor_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.id_caracteristicas_motor_seq', 3, true);
          public          postgres    false    218            �           0    0    id_checklist_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.id_checklist_seq', 51, true);
          public          postgres    false    220            �           0    0    id_componentes_checklist_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_componentes_checklist_seq', 18, true);
          public          postgres    false    222            �           0    0     id_descripcion_del_equipo_hv_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.id_descripcion_del_equipo_hv_seq', 3, true);
          public          postgres    false    224            �           0    0    id_historial_reparaciones_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_historial_reparaciones_seq', 6, true);
          public          postgres    false    226            �           0    0    id_hoja_de_vida_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_hoja_de_vida_seq', 1, false);
          public          postgres    false    228            �           0    0    id_hoja_inspeccion_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.id_hoja_inspeccion_seq', 13, true);
          public          postgres    false    230            �           0    0    id_instructor_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.id_instructor_seq', 6, true);
          public          postgres    false    233            �           0    0    id_insumos_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_insumos_seq', 45, true);
          public          postgres    false    234            �           0    0    id_insumos_usados_ot_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.id_insumos_usados_ot_seq', 1, false);
          public          postgres    false    235            �           0    0    id_maquinas_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_maquinas_seq', 6, true);
          public          postgres    false    236            �           0    0    id_orden_de_trabajo_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.id_orden_de_trabajo_seq', 1, false);
          public          postgres    false    237            �           0    0    id_tipo_maquina_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_tipo_maquina_seq', 15, true);
          public          postgres    false    238            �           2606    17544    aprendices aprendices_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT aprendices_pkey PRIMARY KEY (id_aprendiz);
 D   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT aprendices_pkey;
       public            postgres    false    215            �           2606    17546 4   caracteristicas_maquina caracteristicas_maquina_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_pkey PRIMARY KEY (id_caracteristicas_maquina);
 ^   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_pkey;
       public            postgres    false    217            �           2606    17548 0   caracteristicas_motor caracteristicas_motor_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_motor
    ADD CONSTRAINT caracteristicas_motor_pkey PRIMARY KEY (id_caracteristicas_motor);
 Z   ALTER TABLE ONLY public.caracteristicas_motor DROP CONSTRAINT caracteristicas_motor_pkey;
       public            postgres    false    219            �           2606    17550    checklist checklist_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_pkey PRIMARY KEY (id_checklist);
 B   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_pkey;
       public            postgres    false    221            �           2606    17552 0   componentes_checklist componentes_checklist_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.componentes_checklist
    ADD CONSTRAINT componentes_checklist_pkey PRIMARY KEY (id_componente);
 Z   ALTER TABLE ONLY public.componentes_checklist DROP CONSTRAINT componentes_checklist_pkey;
       public            postgres    false    223            �           2606    17554 8   descripcion_del_equipo_hv descripcion_del_equipo_hv_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.descripcion_del_equipo_hv
    ADD CONSTRAINT descripcion_del_equipo_hv_pkey PRIMARY KEY (id_descripcion_del_equipo_hv);
 b   ALTER TABLE ONLY public.descripcion_del_equipo_hv DROP CONSTRAINT descripcion_del_equipo_hv_pkey;
       public            postgres    false    225            �           2606    17556 2   historial_reparaciones historial_reparaciones_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_pkey PRIMARY KEY (id_historial_reparaciones);
 \   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_pkey;
       public            postgres    false    227            �           2606    17558    hoja_de_vida hoja_de_vida_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_pkey PRIMARY KEY (id_hoja_de_vida);
 H   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_pkey;
       public            postgres    false    229            �           2606    17560 $   hoja_inspeccion hoja_inspeccion_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_pkey PRIMARY KEY (id_inspeccion);
 N   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_pkey;
       public            postgres    false    231            �           2606    17562    instructores instructores_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.instructores
    ADD CONSTRAINT instructores_pkey PRIMARY KEY (id_instructor);
 H   ALTER TABLE ONLY public.instructores DROP CONSTRAINT instructores_pkey;
       public            postgres    false    232            �           2606    17564    insumos insumos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT insumos_pkey PRIMARY KEY (id_insumos);
 >   ALTER TABLE ONLY public.insumos DROP CONSTRAINT insumos_pkey;
       public            postgres    false    239            �           2606    17566 (   insumos_usados_ot insumos_usados_ot_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_pkey PRIMARY KEY (insumos_usados_ot);
 R   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_pkey;
       public            postgres    false    240            �           2606    17568    maquinas maquinas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_pkey PRIMARY KEY (id_maquina);
 @   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_pkey;
       public            postgres    false    241            �           2606    17570 &   orden_de_trabajo orden_de_trabajo_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_pkey PRIMARY KEY (id_orden_de_trabajo);
 P   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_pkey;
       public            postgres    false    242            �           2606    17572    tipo_maquina tipo_maquina_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.tipo_maquina
    ADD CONSTRAINT tipo_maquina_pkey PRIMARY KEY (id_tipo_maquina);
 H   ALTER TABLE ONLY public.tipo_maquina DROP CONSTRAINT tipo_maquina_pkey;
       public            postgres    false    243            �           2606    17573 M   caracteristicas_maquina caracteristicas_maquina_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 w   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey;
       public          postgres    false    219    3263    217            �           2606    17578 Q   caracteristicas_maquina caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 {   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    3269    225    217            �           2606    17583 D   caracteristicas_maquina caracteristicas_maquina_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 n   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey;
       public          postgres    false    229    217    3273            �           2606    17588 ?   caracteristicas_maquina caracteristicas_maquina_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 i   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_maquina_fkey;
       public          postgres    false    3283    217    241            �           2606    17593 ;   caracteristicas_motor caracteristicas_motor_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_motor
    ADD CONSTRAINT caracteristicas_motor_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 e   ALTER TABLE ONLY public.caracteristicas_motor DROP CONSTRAINT caracteristicas_motor_id_maquina_fkey;
       public          postgres    false    219    3283    241            �           2606    17598 &   checklist checklist_id_componente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_componente_fkey FOREIGN KEY (id_componente) REFERENCES public.componentes_checklist(id_componente) NOT VALID;
 P   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_componente_fkey;
       public          postgres    false    221    223    3267            �           2606    17603 &   checklist checklist_id_inspeccion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_inspeccion_fkey FOREIGN KEY (id_inspeccion) REFERENCES public.hoja_inspeccion(id_inspeccion) NOT VALID;
 P   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_inspeccion_fkey;
       public          postgres    false    221    3275    231            �           2606    17608 C   descripcion_del_equipo_hv descripcion_del_equipo_hv_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.descripcion_del_equipo_hv
    ADD CONSTRAINT descripcion_del_equipo_hv_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 m   ALTER TABLE ONLY public.descripcion_del_equipo_hv DROP CONSTRAINT descripcion_del_equipo_hv_id_maquina_fkey;
       public          postgres    false    225    3283    241            �           2606    17613 B   historial_reparaciones historial_reparaciones_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 l   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey;
       public          postgres    false    229    227    3273            �           2606    17618 =   historial_reparaciones historial_reparaciones_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 g   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_id_maquina_fkey;
       public          postgres    false    241    227    3283            �           2606    17623 9   hoja_de_vida hoja_de_vida_id_caracteristicas_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey FOREIGN KEY (id_caracteristicas_maquina) REFERENCES public.caracteristicas_maquina(id_caracteristicas_maquina) NOT VALID;
 c   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey;
       public          postgres    false    229    3261    217            �           2606    17628 7   hoja_de_vida hoja_de_vida_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 a   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey;
       public          postgres    false    229    219    3263            �           2606    17633 ;   hoja_de_vida hoja_de_vida_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 e   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    225    3269    229            �           2606    17638 8   hoja_de_vida hoja_de_vida_id_historial_reparaciones_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey FOREIGN KEY (id_historial_reparaciones) REFERENCES public.historial_reparaciones(id_historial_reparaciones) NOT VALID;
 b   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey;
       public          postgres    false    229    227    3271            �           2606    17643 )   hoja_de_vida hoja_de_vida_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina);
 S   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_maquina_fkey;
       public          postgres    false    229    241    3283            �           2606    17648 0   hoja_inspeccion hoja_inspeccion_id_aprendiz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_id_aprendiz_fkey FOREIGN KEY (id_aprendiz) REFERENCES public.aprendices(id_aprendiz);
 Z   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_id_aprendiz_fkey;
       public          postgres    false    215    3259    231            �           2606    17653 '   aprendices instructor registra aprendiz    FK CONSTRAINT     �   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT "instructor registra aprendiz" FOREIGN KEY (id_instructor) REFERENCES public.instructores(id_instructor) NOT VALID;
 S   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT "instructor registra aprendiz";
       public          postgres    false    232    3277    215            �           0    0 7   CONSTRAINT "instructor registra aprendiz" ON aprendices    COMMENT     m   COMMENT ON CONSTRAINT "instructor registra aprendiz" ON public.aprendices IS 'instructor registra aprendiz';
          public          postgres    false    3288            �           2606    17658 3   insumos_usados_ot insumos_usados_ot_id_insumos_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_insumos_fkey FOREIGN KEY (id_insumos) REFERENCES public.insumos(id_insumos) NOT VALID;
 ]   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_insumos_fkey;
       public          postgres    false    239    3279    240            �           2606    17663 <   insumos_usados_ot insumos_usados_ot_id_orden_de_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey FOREIGN KEY (id_orden_de_trabajo) REFERENCES public.orden_de_trabajo(id_orden_de_trabajo) NOT VALID;
 f   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey;
       public          postgres    false    3285    242    240            �           2606    17668 &   maquinas maquinas_id_tipo_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_id_tipo_maquina_fkey FOREIGN KEY (id_tipo_maquina) REFERENCES public.tipo_maquina(id_tipo_maquina) NOT VALID;
 P   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_id_tipo_maquina_fkey;
       public          postgres    false    241    3287    243            �           2606    17673 2   orden_de_trabajo orden_de_trabajo_id_aprendiz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_id_aprendiz_fkey FOREIGN KEY (id_aprendiz) REFERENCES public.aprendices(id_aprendiz) NOT VALID;
 \   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_id_aprendiz_fkey;
       public          postgres    false    3259    215    242            �           2606    17678 1   orden_de_trabajo orden_de_trabajo_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 [   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_id_maquina_fkey;
       public          postgres    false    241    242    3283            }   �   x����
�0���)�%w��݄���Ա�ф��$PR�}�����D���>>>(X5_�4�0V/i������jۆ�6�.
���lp�ِ"#F�Γ�6�uM�93R�\i��?���d5��M��,_ΐY���
Tz��Rr�g��M���/5�(��������x�q������         �  x��T���0=�_1Юb�I��͂�E
&5��^�@*���ڐ�j�����I�J���R�`̛Ǽ7��!�r�Z����<=��7����1ӹӽ7�n�췺���fg�1���>�LCn�1.�vl=K��?�g�\M���l4Ϧc��-H�	S�M�P~���s{~9ʮ^�;�ޑ$|�ԝ�����h���%��9�*��}�R��?r)1K�(V(n�Z�1J��ǹ(JY�V)��$nr�!|�y�ˉ9a���e��x����Q$9dXr���x~*Pש��VƓE��^�6(q.K~q�`Ds��=�fdm�����!6;4��f:��474�ȵS��vN�u�TF�����j�X^��1`��a��5$��0z�03��nP.�����
6�΅IRw��hZ��~��ɂpw�&��gW��?h~e��{i[�~����R�yW��      �   ]   x�u�1� �������ƕ8�:�$�D,A��'����ے���#Y,o)��!,�>ںt�����.��G��Vd�fb�+&�z"� � �      �   %   x�35�L*M���4��44�25��Ḿ���b���� �      �   ,   x�3��t��-��K�+IU�MMN��L��tJ�KNLI����� �6      �   �   x����� ���)�3�S��x�bL�q�f�@d#���-(Dw1����_(�)��m�`�MA��č>�B�œ�+?#D�]�E \9ʋo�?v��λ�C[��J�2z�s��+#�g��Oz4�P"�@٢��]"{rq�Y��ss�/��o�^{�o�/�%X�      �   �   x�e�M
�0��3��Tb�/�֍�n�&JD�:i(x*��Ɍ��`��=^��F+m*�+���@�����6����-|ޯ��֑��%�;Q/|�t��ca��>;�cN#�H���@����C�«�3��h�R��<^?�[��x	�?Y      �      x������ � �      �   9   x�34�4202�50�54�40�21�20�44�2b����HJ���!J���=... �s      �   r   x�m˽
�@�:yq�I\�{�k籊���o��N�!``��d���̓�@�E���� [:d���BL�&�ʅ>Z)V����Z�~UX�m�����l�pP��B�K]7�      �   �   x�]��� D�ÿ``�ī^4=��ic4MIh��/4Z��{3�]���H��8).��Н��}WJmJ�+5u<$�����u�	Ds��Yh؄�y�az���}�ٔ'H�껟+&\]�_J�k
'�8�(.d������A[��&��cr�I#      �      x������ � �      �   c   x�3��,.��S0���W�H�T(�/RH�Q���M�+����2��1�L�M8�3S����@���nE�ŉ)��D?��H)Рb��Ă��d�	1z\\\ �Y#�      �      x������ � �      �   �   x�=�;�@Dk�)|D����&�4i%�:x���3��o>�]=�Ӡl��^r����My�`�_�r��[��t
m��:�]+?�7�����{L�w_��KO�魦n���{��ҙ�^$�!��c+ٴQ�˔q6Eў���7d�<f}��E&$�x���7��J)} �&U�     