PGDMP         &                 |            gestion_de_mantenimiento    14.9    14.9 d    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17067    gestion_de_mantenimiento    DATABASE     t   CREATE DATABASE gestion_de_mantenimiento WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
 (   DROP DATABASE gestion_de_mantenimiento;
                postgres    false            �            1259    17068    id_aprendiz_seq    SEQUENCE        CREATE SEQUENCE public.id_aprendiz_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_aprendiz_seq;
       public          postgres    false            �            1259    17069 
   aprendices    TABLE     �  CREATE TABLE public.aprendices (
    id_aprendiz integer DEFAULT nextval('public.id_aprendiz_seq'::regclass) NOT NULL,
    tipo_doc character varying(50) NOT NULL,
    num_doc integer NOT NULL,
    ficha integer NOT NULL,
    programa character varying(100) NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    telefono integer NOT NULL,
    equipo character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    id_instructor integer NOT NULL
);
    DROP TABLE public.aprendices;
       public         heap    postgres    false    209            �            1259    17073    id_caracteristicas_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 5   DROP SEQUENCE public.id_caracteristicas_maquina_seq;
       public          postgres    false            �            1259    17074    caracteristicas_maquina    TABLE     �  CREATE TABLE public.caracteristicas_maquina (
    id_caracteristicas_maquina integer DEFAULT nextval('public.id_caracteristicas_maquina_seq'::regclass) NOT NULL,
    nombre_caracteristica character varying(150) NOT NULL,
    funcion_maquina character varying(300) NOT NULL,
    imagen_maquina character varying(500) NOT NULL,
    id_caracteristicas_motor integer NOT NULL,
    id_hoja_de_vida integer NOT NULL,
    id_descripcion_del_equipo_hv integer NOT NULL
);
 +   DROP TABLE public.caracteristicas_maquina;
       public         heap    postgres    false    211            �            1259    17080    id_caracteristicas_motor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_caracteristicas_motor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_caracteristicas_motor_seq;
       public          postgres    false            �            1259    17081    caracteristicas_motor    TABLE     c  CREATE TABLE public.caracteristicas_motor (
    id_caracteristicas_motor integer DEFAULT nextval('public.id_caracteristicas_motor_seq'::regclass) NOT NULL,
    marca_motor character varying(100) NOT NULL,
    modelo_motor character varying(100) NOT NULL,
    descripcion_motor character varying(150) NOT NULL,
    serie_motor character varying(150) NOT NULL,
    "tamaño_motor" character varying(100) NOT NULL,
    potencia_motor character varying(100) NOT NULL,
    rpm_motor character varying(100) NOT NULL,
    voltaje_motor character varying(100) NOT NULL,
    amp_motor character varying(100) NOT NULL
);
 )   DROP TABLE public.caracteristicas_motor;
       public         heap    postgres    false    213            �            1259    17087    id_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 '   DROP SEQUENCE public.id_checklist_seq;
       public          postgres    false            �            1259    17088 	   checklist    TABLE     �   CREATE TABLE public.checklist (
    id_checklist integer DEFAULT nextval('public.id_checklist_seq'::regclass) NOT NULL,
    estado_componentete character varying(50) NOT NULL,
    id_componente integer NOT NULL,
    id_inspeccion integer NOT NULL
);
    DROP TABLE public.checklist;
       public         heap    postgres    false    215            �            1259    17092    id_componentes_checklist_seq    SEQUENCE     �   CREATE SEQUENCE public.id_componentes_checklist_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 3   DROP SEQUENCE public.id_componentes_checklist_seq;
       public          postgres    false            �            1259    17093    componentes_checklist    TABLE     7  CREATE TABLE public.componentes_checklist (
    id_componente integer DEFAULT nextval('public.id_componentes_checklist_seq'::regclass) NOT NULL,
    tipo_componente character varying(50) NOT NULL,
    nombre_componenete character varying(50) NOT NULL,
    prioridad_componente character varying(25) NOT NULL
);
 )   DROP TABLE public.componentes_checklist;
       public         heap    postgres    false    217            �            1259    17097     id_descripcion_del_equipo_hv_seq    SEQUENCE     �   CREATE SEQUENCE public.id_descripcion_del_equipo_hv_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 7   DROP SEQUENCE public.id_descripcion_del_equipo_hv_seq;
       public          postgres    false            �            1259    17098    descripcion_del_equipo_hv    TABLE     ^  CREATE TABLE public.descripcion_del_equipo_hv (
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
    sistema_termico_equipo character varying(50) NOT NULL
);
 -   DROP TABLE public.descripcion_del_equipo_hv;
       public         heap    postgres    false    219            �            1259    17104    id_historial_reparaciones_seq    SEQUENCE     �   CREATE SEQUENCE public.id_historial_reparaciones_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 4   DROP SEQUENCE public.id_historial_reparaciones_seq;
       public          postgres    false            �            1259    17105    historial_reparaciones    TABLE     �  CREATE TABLE public.historial_reparaciones (
    id_historial_reparaciones integer DEFAULT nextval('public.id_historial_reparaciones_seq'::regclass) NOT NULL,
    procedimiento_historial character varying(500) NOT NULL,
    insumos_usados_historial character varying(500) NOT NULL,
    observaciones_historial character varying(500) NOT NULL,
    fecha_historial date NOT NULL,
    id_hoja_de_vida integer NOT NULL
);
 *   DROP TABLE public.historial_reparaciones;
       public         heap    postgres    false    221            �            1259    17111    id_hoja_de_vida_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_de_vida_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_hoja_de_vida_seq;
       public          postgres    false            �            1259    17112    hoja_de_vida    TABLE     g  CREATE TABLE public.hoja_de_vida (
    id_hoja_de_vida integer DEFAULT nextval('public.id_hoja_de_vida_seq'::regclass) NOT NULL,
    id_caracteristicas_maquina integer NOT NULL,
    id_caracteristicas_motor integer NOT NULL,
    id_descripcion_del_equipo_hv integer NOT NULL,
    id_historial_reparaciones integer NOT NULL,
    id_maquina integer NOT NULL
);
     DROP TABLE public.hoja_de_vida;
       public         heap    postgres    false    223            �            1259    17116    id_hoja_inspeccion_seq    SEQUENCE     �   CREATE SEQUENCE public.id_hoja_inspeccion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 -   DROP SEQUENCE public.id_hoja_inspeccion_seq;
       public          postgres    false            �            1259    17117    hoja_inspeccion    TABLE     !  CREATE TABLE public.hoja_inspeccion (
    id_inspeccion integer DEFAULT nextval('public.id_hoja_inspeccion_seq'::regclass) NOT NULL,
    fecha date NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    id_aprendiz integer NOT NULL
);
 #   DROP TABLE public.hoja_inspeccion;
       public         heap    postgres    false    225            �            1259    17121    instructores    TABLE     ;  CREATE TABLE public.instructores (
    id_instructor integer NOT NULL,
    cc_instructor integer NOT NULL,
    nombre_instructor character varying(100) NOT NULL,
    email_instructor character varying(50) NOT NULL,
    telefono_instructor integer NOT NULL,
    password_instructor character varying(20) NOT NULL
);
     DROP TABLE public.instructores;
       public         heap    postgres    false            �            1259    17124    id_instructor_seq    SEQUENCE     �   CREATE SEQUENCE public.id_instructor_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 (   DROP SEQUENCE public.id_instructor_seq;
       public          postgres    false    227            �           0    0    id_instructor_seq    SEQUENCE OWNED BY     T   ALTER SEQUENCE public.id_instructor_seq OWNED BY public.instructores.id_instructor;
          public          postgres    false    228            �            1259    17125    id_insumos_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 %   DROP SEQUENCE public.id_insumos_seq;
       public          postgres    false            �            1259    17126    id_insumos_usados_ot_seq    SEQUENCE     �   CREATE SEQUENCE public.id_insumos_usados_ot_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 /   DROP SEQUENCE public.id_insumos_usados_ot_seq;
       public          postgres    false            �            1259    17127    id_maquinas_seq    SEQUENCE     �   CREATE SEQUENCE public.id_maquinas_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 &   DROP SEQUENCE public.id_maquinas_seq;
       public          postgres    false            �            1259    17128    id_orden_de_trabajo_seq    SEQUENCE     �   CREATE SEQUENCE public.id_orden_de_trabajo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 .   DROP SEQUENCE public.id_orden_de_trabajo_seq;
       public          postgres    false            �            1259    17129    id_tipo_maquina_seq    SEQUENCE     �   CREATE SEQUENCE public.id_tipo_maquina_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 999999999999
    CACHE 1;
 *   DROP SEQUENCE public.id_tipo_maquina_seq;
       public          postgres    false            �            1259    17130    insumos    TABLE     �  CREATE TABLE public.insumos (
    id_insumos integer DEFAULT nextval('public.id_insumos_seq'::regclass) NOT NULL,
    nombre character varying(150) NOT NULL,
    estado_insumo character varying(100) NOT NULL,
    fecha_llegada date NOT NULL,
    usado_ultima_vez date NOT NULL,
    cantidad_insumo integer NOT NULL,
    numero_insumo integer NOT NULL,
    proveedor character varying(150) NOT NULL
);
    DROP TABLE public.insumos;
       public         heap    postgres    false    229            �            1259    17134    insumos_usados_ot    TABLE        CREATE TABLE public.insumos_usados_ot (
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
       public         heap    postgres    false    230            �            1259    17138    maquinas    TABLE     �   CREATE TABLE public.maquinas (
    id_maquina integer DEFAULT nextval('public.id_maquinas_seq'::regclass) NOT NULL,
    nombre_maquina character varying(100) NOT NULL,
    manual_maquina character varying(450),
    id_tipo_maquina integer NOT NULL
);
    DROP TABLE public.maquinas;
       public         heap    postgres    false    231            �            1259    17144    orden_de_trabajo    TABLE     W  CREATE TABLE public.orden_de_trabajo (
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
       public         heap    postgres    false    232            �            1259    17150    tipo_maquina    TABLE     �   CREATE TABLE public.tipo_maquina (
    id_tipo_maquina integer DEFAULT nextval('public.id_tipo_maquina_seq'::regclass) NOT NULL,
    nombre_tipo_maquina character varying(50) NOT NULL,
    descripcion_tipo_maquina character varying(300) NOT NULL
);
     DROP TABLE public.tipo_maquina;
       public         heap    postgres    false    233            �           2604    17154    instructores id_instructor    DEFAULT     {   ALTER TABLE ONLY public.instructores ALTER COLUMN id_instructor SET DEFAULT nextval('public.id_instructor_seq'::regclass);
 I   ALTER TABLE public.instructores ALTER COLUMN id_instructor DROP DEFAULT;
       public          postgres    false    228    227            m          0    17069 
   aprendices 
   TABLE DATA           �   COPY public.aprendices (id_aprendiz, tipo_doc, num_doc, ficha, programa, nombre, email, telefono, equipo, password, id_instructor) FROM stdin;
    public          postgres    false    210   �       o          0    17074    caracteristicas_maquina 
   TABLE DATA           �   COPY public.caracteristicas_maquina (id_caracteristicas_maquina, nombre_caracteristica, funcion_maquina, imagen_maquina, id_caracteristicas_motor, id_hoja_de_vida, id_descripcion_del_equipo_hv) FROM stdin;
    public          postgres    false    212   -�       q          0    17081    caracteristicas_motor 
   TABLE DATA           �   COPY public.caracteristicas_motor (id_caracteristicas_motor, marca_motor, modelo_motor, descripcion_motor, serie_motor, "tamaño_motor", potencia_motor, rpm_motor, voltaje_motor, amp_motor) FROM stdin;
    public          postgres    false    214   J�       s          0    17088 	   checklist 
   TABLE DATA           d   COPY public.checklist (id_checklist, estado_componentete, id_componente, id_inspeccion) FROM stdin;
    public          postgres    false    216   g�       u          0    17093    componentes_checklist 
   TABLE DATA           y   COPY public.componentes_checklist (id_componente, tipo_componente, nombre_componenete, prioridad_componente) FROM stdin;
    public          postgres    false    218   ��       w          0    17098    descripcion_del_equipo_hv 
   TABLE DATA             COPY public.descripcion_del_equipo_hv (id_descripcion_del_equipo_hv, nombre_equipo, marca_equipo, fecha_fabricacion_equipo, fabricante_equipo, ubicacion_equipo, caracteristicas_equipo, codigo_equipo, modelo_equipo, num_serie_equipo, prioridad_equipo, voltaje_equipo, corriente_equipo, frecuencia_equipo, capacidad_equipo, peso_equipo, alimentacion_equipo, sistema_electrico_equipo, sistema_electronico_equipo, sistema_mecanico_equipo, sistema_neumatico_equipo, sistema_hidraulico_equipo, sistema_termico_equipo) FROM stdin;
    public          postgres    false    220   ��       y          0    17105    historial_reparaciones 
   TABLE DATA           �   COPY public.historial_reparaciones (id_historial_reparaciones, procedimiento_historial, insumos_usados_historial, observaciones_historial, fecha_historial, id_hoja_de_vida) FROM stdin;
    public          postgres    false    222   ��       {          0    17112    hoja_de_vida 
   TABLE DATA           �   COPY public.hoja_de_vida (id_hoja_de_vida, id_caracteristicas_maquina, id_caracteristicas_motor, id_descripcion_del_equipo_hv, id_historial_reparaciones, id_maquina) FROM stdin;
    public          postgres    false    224   ۚ       }          0    17117    hoja_inspeccion 
   TABLE DATA           c   COPY public.hoja_inspeccion (id_inspeccion, fecha, hora_inicio, hora_fin, id_aprendiz) FROM stdin;
    public          postgres    false    226   ��       ~          0    17121    instructores 
   TABLE DATA           �   COPY public.instructores (id_instructor, cc_instructor, nombre_instructor, email_instructor, telefono_instructor, password_instructor) FROM stdin;
    public          postgres    false    227   �       �          0    17130    insumos 
   TABLE DATA           �   COPY public.insumos (id_insumos, nombre, estado_insumo, fecha_llegada, usado_ultima_vez, cantidad_insumo, numero_insumo, proveedor) FROM stdin;
    public          postgres    false    234   2�       �          0    17134    insumos_usados_ot 
   TABLE DATA           �   COPY public.insumos_usados_ot (insumos_usados_ot, nombre_insumo_ot, cantidad_insumo_ot, unidad_insumo_ot, valor_insumo_ot, subtotal_insumo_ot, total_precio_insumo_ot, origen_insumo_ot, id_orden_de_trabajo, id_insumos) FROM stdin;
    public          postgres    false    235   O�       �          0    17138    maquinas 
   TABLE DATA           _   COPY public.maquinas (id_maquina, nombre_maquina, manual_maquina, id_tipo_maquina) FROM stdin;
    public          postgres    false    236   l�       �          0    17144    orden_de_trabajo 
   TABLE DATA           N  COPY public.orden_de_trabajo (id_orden_de_trabajo, fecha_inicio_ot, hora_inicio_ot, fecha_fin_ot, hora_fin_ot, total_horas_ot, precio_hora, total_mano_obra, tipo_de_trabajo, tipo_de_mantenimiento, tipo_de_sistema, descripcion_de_trabajo, subtotal_ot, iva, total_precio_horas, costo_mantenimiento, id_maquina, id_aprendiz) FROM stdin;
    public          postgres    false    237   ��       �          0    17150    tipo_maquina 
   TABLE DATA           f   COPY public.tipo_maquina (id_tipo_maquina, nombre_tipo_maquina, descripcion_tipo_maquina) FROM stdin;
    public          postgres    false    238   ��       �           0    0    id_aprendiz_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.id_aprendiz_seq', 1, false);
          public          postgres    false    209            �           0    0    id_caracteristicas_maquina_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.id_caracteristicas_maquina_seq', 1, false);
          public          postgres    false    211            �           0    0    id_caracteristicas_motor_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_caracteristicas_motor_seq', 1, false);
          public          postgres    false    213            �           0    0    id_checklist_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.id_checklist_seq', 1, false);
          public          postgres    false    215            �           0    0    id_componentes_checklist_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.id_componentes_checklist_seq', 1, false);
          public          postgres    false    217            �           0    0     id_descripcion_del_equipo_hv_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.id_descripcion_del_equipo_hv_seq', 1, false);
          public          postgres    false    219            �           0    0    id_historial_reparaciones_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.id_historial_reparaciones_seq', 1, false);
          public          postgres    false    221            �           0    0    id_hoja_de_vida_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_hoja_de_vida_seq', 1, false);
          public          postgres    false    223            �           0    0    id_hoja_inspeccion_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.id_hoja_inspeccion_seq', 1, false);
          public          postgres    false    225            �           0    0    id_instructor_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.id_instructor_seq', 1, true);
          public          postgres    false    228            �           0    0    id_insumos_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.id_insumos_seq', 1, false);
          public          postgres    false    229            �           0    0    id_insumos_usados_ot_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.id_insumos_usados_ot_seq', 1, false);
          public          postgres    false    230            �           0    0    id_maquinas_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.id_maquinas_seq', 1, false);
          public          postgres    false    231            �           0    0    id_orden_de_trabajo_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.id_orden_de_trabajo_seq', 1, false);
          public          postgres    false    232            �           0    0    id_tipo_maquina_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.id_tipo_maquina_seq', 1, false);
          public          postgres    false    233            �           2606    17156    aprendices aprendices_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT aprendices_pkey PRIMARY KEY (id_aprendiz);
 D   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT aprendices_pkey;
       public            postgres    false    210            �           2606    17158 4   caracteristicas_maquina caracteristicas_maquina_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_pkey PRIMARY KEY (id_caracteristicas_maquina);
 ^   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_pkey;
       public            postgres    false    212            �           2606    17160 0   caracteristicas_motor caracteristicas_motor_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_motor
    ADD CONSTRAINT caracteristicas_motor_pkey PRIMARY KEY (id_caracteristicas_motor);
 Z   ALTER TABLE ONLY public.caracteristicas_motor DROP CONSTRAINT caracteristicas_motor_pkey;
       public            postgres    false    214            �           2606    17162    checklist checklist_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_pkey PRIMARY KEY (id_checklist);
 B   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_pkey;
       public            postgres    false    216            �           2606    17164 0   componentes_checklist componentes_checklist_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.componentes_checklist
    ADD CONSTRAINT componentes_checklist_pkey PRIMARY KEY (id_componente);
 Z   ALTER TABLE ONLY public.componentes_checklist DROP CONSTRAINT componentes_checklist_pkey;
       public            postgres    false    218            �           2606    17166 8   descripcion_del_equipo_hv descripcion_del_equipo_hv_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.descripcion_del_equipo_hv
    ADD CONSTRAINT descripcion_del_equipo_hv_pkey PRIMARY KEY (id_descripcion_del_equipo_hv);
 b   ALTER TABLE ONLY public.descripcion_del_equipo_hv DROP CONSTRAINT descripcion_del_equipo_hv_pkey;
       public            postgres    false    220            �           2606    17168 2   historial_reparaciones historial_reparaciones_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_pkey PRIMARY KEY (id_historial_reparaciones);
 \   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_pkey;
       public            postgres    false    222            �           2606    17170    hoja_de_vida hoja_de_vida_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_pkey PRIMARY KEY (id_hoja_de_vida);
 H   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_pkey;
       public            postgres    false    224            �           2606    17172 $   hoja_inspeccion hoja_inspeccion_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_pkey PRIMARY KEY (id_inspeccion);
 N   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_pkey;
       public            postgres    false    226            �           2606    17174    instructores instructores_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public.instructores
    ADD CONSTRAINT instructores_pkey PRIMARY KEY (id_instructor);
 H   ALTER TABLE ONLY public.instructores DROP CONSTRAINT instructores_pkey;
       public            postgres    false    227            �           2606    17176    insumos insumos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.insumos
    ADD CONSTRAINT insumos_pkey PRIMARY KEY (id_insumos);
 >   ALTER TABLE ONLY public.insumos DROP CONSTRAINT insumos_pkey;
       public            postgres    false    234            �           2606    17178 (   insumos_usados_ot insumos_usados_ot_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_pkey PRIMARY KEY (insumos_usados_ot);
 R   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_pkey;
       public            postgres    false    235            �           2606    17180    maquinas maquinas_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_pkey PRIMARY KEY (id_maquina);
 @   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_pkey;
       public            postgres    false    236            �           2606    17182 &   orden_de_trabajo orden_de_trabajo_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_pkey PRIMARY KEY (id_orden_de_trabajo);
 P   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_pkey;
       public            postgres    false    237            �           2606    17184    tipo_maquina tipo_maquina_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.tipo_maquina
    ADD CONSTRAINT tipo_maquina_pkey PRIMARY KEY (id_tipo_maquina);
 H   ALTER TABLE ONLY public.tipo_maquina DROP CONSTRAINT tipo_maquina_pkey;
       public            postgres    false    238            �           2606    17185 M   caracteristicas_maquina caracteristicas_maquina_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 w   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_caracteristicas_motor_fkey;
       public          postgres    false    212    3254    214            �           2606    17190 Q   caracteristicas_maquina caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 {   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    3260    212    220            �           2606    17195 D   caracteristicas_maquina caracteristicas_maquina_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.caracteristicas_maquina
    ADD CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 n   ALTER TABLE ONLY public.caracteristicas_maquina DROP CONSTRAINT caracteristicas_maquina_id_hoja_de_vida_fkey;
       public          postgres    false    224    3264    212            �           2606    17200 &   checklist checklist_id_componente_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_componente_fkey FOREIGN KEY (id_componente) REFERENCES public.componentes_checklist(id_componente) NOT VALID;
 P   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_componente_fkey;
       public          postgres    false    3258    218    216            �           2606    17205 &   checklist checklist_id_inspeccion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_id_inspeccion_fkey FOREIGN KEY (id_inspeccion) REFERENCES public.hoja_inspeccion(id_inspeccion) NOT VALID;
 P   ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_id_inspeccion_fkey;
       public          postgres    false    3266    226    216            �           2606    17210 B   historial_reparaciones historial_reparaciones_id_hoja_de_vida_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.historial_reparaciones
    ADD CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey FOREIGN KEY (id_hoja_de_vida) REFERENCES public.hoja_de_vida(id_hoja_de_vida) NOT VALID;
 l   ALTER TABLE ONLY public.historial_reparaciones DROP CONSTRAINT historial_reparaciones_id_hoja_de_vida_fkey;
       public          postgres    false    224    3264    222            �           2606    17256 9   hoja_de_vida hoja_de_vida_id_caracteristicas_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey FOREIGN KEY (id_caracteristicas_maquina) REFERENCES public.caracteristicas_maquina(id_caracteristicas_maquina) NOT VALID;
 c   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_maquina_fkey;
       public          postgres    false    3252    224    212            �           2606    17215 7   hoja_de_vida hoja_de_vida_id_caracteristicas_motor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey FOREIGN KEY (id_caracteristicas_motor) REFERENCES public.caracteristicas_motor(id_caracteristicas_motor) NOT VALID;
 a   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_caracteristicas_motor_fkey;
       public          postgres    false    3254    214    224            �           2606    17266 ;   hoja_de_vida hoja_de_vida_id_descripcion_del_equipo_hv_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey FOREIGN KEY (id_descripcion_del_equipo_hv) REFERENCES public.descripcion_del_equipo_hv(id_descripcion_del_equipo_hv) NOT VALID;
 e   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_descripcion_del_equipo_hv_fkey;
       public          postgres    false    3260    220    224            �           2606    17261 8   hoja_de_vida hoja_de_vida_id_historial_reparaciones_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey FOREIGN KEY (id_historial_reparaciones) REFERENCES public.historial_reparaciones(id_historial_reparaciones) NOT VALID;
 b   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_historial_reparaciones_fkey;
       public          postgres    false    224    222    3262            �           2606    17220 )   hoja_de_vida hoja_de_vida_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_de_vida
    ADD CONSTRAINT hoja_de_vida_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina);
 S   ALTER TABLE ONLY public.hoja_de_vida DROP CONSTRAINT hoja_de_vida_id_maquina_fkey;
       public          postgres    false    3274    224    236            �           2606    17225 0   hoja_inspeccion hoja_inspeccion_id_aprendiz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.hoja_inspeccion
    ADD CONSTRAINT hoja_inspeccion_id_aprendiz_fkey FOREIGN KEY (id_aprendiz) REFERENCES public.aprendices(id_aprendiz);
 Z   ALTER TABLE ONLY public.hoja_inspeccion DROP CONSTRAINT hoja_inspeccion_id_aprendiz_fkey;
       public          postgres    false    226    210    3250            �           2606    17230 '   aprendices instructor registra aprendiz    FK CONSTRAINT     �   ALTER TABLE ONLY public.aprendices
    ADD CONSTRAINT "instructor registra aprendiz" FOREIGN KEY (id_instructor) REFERENCES public.instructores(id_instructor) NOT VALID;
 S   ALTER TABLE ONLY public.aprendices DROP CONSTRAINT "instructor registra aprendiz";
       public          postgres    false    227    210    3268            �           0    0 7   CONSTRAINT "instructor registra aprendiz" ON aprendices    COMMENT     m   COMMENT ON CONSTRAINT "instructor registra aprendiz" ON public.aprendices IS 'instructor registra aprendiz';
          public          postgres    false    3279            �           2606    17235 3   insumos_usados_ot insumos_usados_ot_id_insumos_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_insumos_fkey FOREIGN KEY (id_insumos) REFERENCES public.insumos(id_insumos) NOT VALID;
 ]   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_insumos_fkey;
       public          postgres    false    3270    234    235            �           2606    17240 <   insumos_usados_ot insumos_usados_ot_id_orden_de_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.insumos_usados_ot
    ADD CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey FOREIGN KEY (id_orden_de_trabajo) REFERENCES public.orden_de_trabajo(id_orden_de_trabajo) NOT VALID;
 f   ALTER TABLE ONLY public.insumos_usados_ot DROP CONSTRAINT insumos_usados_ot_id_orden_de_trabajo_fkey;
       public          postgres    false    3276    237    235            �           2606    17245 &   maquinas maquinas_id_tipo_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.maquinas
    ADD CONSTRAINT maquinas_id_tipo_maquina_fkey FOREIGN KEY (id_tipo_maquina) REFERENCES public.tipo_maquina(id_tipo_maquina) NOT VALID;
 P   ALTER TABLE ONLY public.maquinas DROP CONSTRAINT maquinas_id_tipo_maquina_fkey;
       public          postgres    false    238    236    3278            �           2606    17271 2   orden_de_trabajo orden_de_trabajo_id_aprendiz_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_id_aprendiz_fkey FOREIGN KEY (id_aprendiz) REFERENCES public.aprendices(id_aprendiz) NOT VALID;
 \   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_id_aprendiz_fkey;
       public          postgres    false    3250    210    237            �           2606    17250 1   orden_de_trabajo orden_de_trabajo_id_maquina_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orden_de_trabajo
    ADD CONSTRAINT orden_de_trabajo_id_maquina_fkey FOREIGN KEY (id_maquina) REFERENCES public.maquinas(id_maquina) NOT VALID;
 [   ALTER TABLE ONLY public.orden_de_trabajo DROP CONSTRAINT orden_de_trabajo_id_maquina_fkey;
       public          postgres    false    236    3274    237            m      x������ � �      o      x������ � �      q      x������ � �      s      x������ � �      u      x������ � �      w      x������ � �      y      x������ � �      {      x������ � �      }      x������ � �      ~      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �     