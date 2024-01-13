DELETE FROM location;
DELETE FROM map;
DELETE from round;
DELETE from game;
DELETE FROM answer;

INSERT INTO map (title, description, image) VALUES
('China', 'Description for Map 2', 'china.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('China', 39.943316666667, 116.50115277778, '414898526515721', currval('map_id_seq')),
('China', 40.377364642778, 117.02696054222, '2968790140025003', currval('map_id_seq')),
('China', 31.223192, 120.461761, '2127936687541460', currval('map_id_seq')),
('China', 30.211616826679574, 115.88559852069511, '2127936687541460', currval('map_id_seq')),
('China', 25.05073, 110.451332, '762954561084750', currval('map_id_seq')),
('China', 30.608024, 104.3140491, '588715343102452', currval('map_id_seq')),
('China', 34.389523285149, 109.27799572733, '777424199835439', currval('map_id_seq')),
('China', 27.152233715211, 120.24270730927, '754975276191884', currval('map_id_seq')),
('China', 34.557102777778, 112.47075555556, '155724896495752', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Korea', 'Description for Map 3', 'korea.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Korea', 36.498161166389, 126.74321133333, '1067332057009156', currval('map_id_seq')),
('Korea', 37.477388100001, 126.8846145, '1792991037798631', currval('map_id_seq')),
('Korea', 35.397927599722, 126.59167225, '739864233371401', currval('map_id_seq')),
('Korea', 35.1518972775, 128.98690296333, '494780251714847', currval('map_id_seq')),
('Korea', 36.899724135417, 126.71763665396, '108387748908002', currval('map_id_seq')),
('Korea', 37.979825385348, 128.51845856987, '772085390987875', currval('map_id_seq')),
('Korea', 34.304544937222, 126.530371125, '466390464473866', currval('map_id_seq')),
('Korea', 34.925415, 128.045384, '562751038047705', currval('map_id_seq')),
('Korea', 35.902418888889, 127.23848083333, '1057433554784947', currval('map_id_seq')),
('Korea', 34.744321576471, 128.66311996471, '405116001210070', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('USA', 'Description for Map 4', 'usa.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('USA', 35.47489724012, -76.131437798204, '308035324246857', currval('map_id_seq')),
('USA', 32.489617705271, -93.069425331343, '4299788250135627', currval('map_id_seq')),
('USA', 33.420377299972, -105.30280419997, '518191042891376', currval('map_id_seq')),
('USA', 37.66642, -110.84239199972, '1415458342148744', currval('map_id_seq')),
('USA', 38.803870223655, -123.01275229927, '861912185488432', currval('map_id_seq')),
('USA', 40.981062722831, -72.597645158505, '304530841171883', currval('map_id_seq')),
('USA', 42.251172, -70.794603, '327145225509796', currval('map_id_seq')),
('USA', 41.368196887477, -88.945221383361, '280298257248805', currval('map_id_seq')),
('USA', 34.382097314073, -119.30114340056, '770265254642503', currval('map_id_seq')),
('USA', 29.996944959163, -92.28128619467, '2890421291172726', currval('map_id_seq')),
('USA', 46.801972760917, -120.361807332, '1087848028389607', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Canada', 'Description for Map 5', 'canada.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Canada', 50.717665632043, -113.51352300976, '601210291098572', currval('map_id_seq')),
('Canada', 50.061294199972, -96.327901199972, '633703744859518', currval('map_id_seq')),
('Canada', 46.7268997, -71.2792964, '332290859301651', currval('map_id_seq')),
('Canada', 45.202066, -75.365924, '1691871034338657', currval('map_id_seq')),
('Canada', 43.9160401192, -79.1015578308, '2929027017318933', currval('map_id_seq')),
('Canada', 43.607304626944, -81.123104290833, '564658534762889', currval('map_id_seq')),
('Canada', 44.894311111111, -81.166986111111, '822983282765634', currval('map_id_seq')),
('Canada', 41.368196887477, -88.945221383361, '280298257248805', currval('map_id_seq')),
('Canada', 34.382097314073, -119.30114340056, '770265254642503', currval('map_id_seq')),
('Canada', 50.072517803298, -96.943498003518, '900397047678408', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Brazil', 'Description for Map 6', 'brazil.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Brazil', -13.539788038669, -47.492559851799, '193058462644394', currval('map_id_seq')),
('Brazil', -14.909172006883, -51.082262406126, '169590248382814', currval('map_id_seq')),
('Brazil', -14.772178191803, -49.590766247541, '1670082593192216', currval('map_id_seq')),
('Brazil', -12.236162692771, -55.546862130522, '912597259607426', currval('map_id_seq')),
('Brazil', -9.0491731, -48.5158455, '835867464758629', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Argentina', 'Description for Map 7', 'argentina.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Argentina', -35.880783299972, -70.6639006, '627418495613074', currval('map_id_seq')),
('Argentina', -34.591112099972, -71.367145399972, '210848121467744', currval('map_id_seq')),
('Argentina', -36.995482141833, -67.500121150598, '171582604902057', currval('map_id_seq')),
('Argentina', -31.712928148555, -68.55472005896, '306780214374115', currval('map_id_seq')),
('Argentina', -33.259296231, -66.0151075479, '528434844849872', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('UK', 'Description for Map 8', 'uk.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('UK', 54.158194060208, -3.2080165983333, '151629296929432', currval('map_id_seq')),
('UK', 57.008355045846, 6.2468289006632, '1190165261548420', currval('map_id_seq')),
('UK', 53.9648457, -8.0726445, '2093825460773986', currval('map_id_seq')),
('UK', 52.025353700001, -9.489504, '851442853279184', currval('map_id_seq')),
('UK', 50.71281788375, -3.0810597452399, '1034639611247282', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('France', 'Description for Map 9', 'france.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('France', 47.614759322580966, 2.0174406717743523, '327212025632899', currval('map_id_seq')),
('France', 48.0461141, 1.8889661, '261149732955942', currval('map_id_seq')),
('France', 49.034760200002, 2.6962972, '1546930429183609', currval('map_id_seq')),
('France', 48.743422, 1.915318, '1008907930513408', currval('map_id_seq')),
('France', 48.970562475205, 1.889707009316, '231705079872929', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Germany', 'Description for Map 10', 'germany.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Germany', 50.5174978, 10.7670633, '927274101839505', currval('map_id_seq')),
('Germany', 50.1131613, 8.7012584, '854617999663639', currval('map_id_seq')),
('Germany', 51.912470627643, 9.6680290237801, '964862731313040', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Italy', 'Description for Map 11', 'italy.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Italy', 42.294893345974, 13.537208157593, '164485352722906', currval('map_id_seq')),
('Italy', 43.375400099999, 13.209693099998, '560791725432374', currval('map_id_seq')),
('Italy', 43.298956, 10.546975100002, '930141417749567', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Spain', 'Description for Map 12', 'spain.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Spain', 38.8916888, -3.0255900999987, '768658713814551', currval('map_id_seq')),
('Spain', 39.779925, -3.9112686000019, '1694534310890196', currval('map_id_seq')),
('Spain', 40.739138141267, -4.21854834811, '832912941495301', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Russia', 'Description for Map 13', 'russia.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Russia', 55.359271368995, 39.111541779748, '292779248992342', currval('map_id_seq')),
('Russia', 56.38697431, 36.73822407, '182016173822263', currval('map_id_seq')),
('Russia', 54.22851752, 37.37115722, '161804565818247', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('India', 'Description for Map 14', 'india.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('India', 23.071038055556, 76.824473055556, '806422976947987', currval('map_id_seq')),
('India', 24.016205899972, 75.5463136, '550761609984560', currval('map_id_seq')),
('India', 26.76863685, 79.1018227, '409894470413566', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Australia', 'Description for Map 15', 'australia.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Australia', -32.320444444444, 116.21191666667, '1637972823066252', currval('map_id_seq')),
('Australia', -24.371177400002, 132.76891339869, '1637972823066252', currval('map_id_seq')),
('Australia', -33.222722465966, 149.7455600996, '701300195218063', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('New Zealand', 'Description for Map 16', 'newzealand.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('New Zealand', -41.531239722222, 175.48467638889, '316969403187350', currval('map_id_seq')),
('New Zealand', -45.097591388889, 169.14941388889, '1261805304748350', currval('map_id_seq')),
('New Zealand', -45.850035, 170.70577, '300456234961410', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('South Africa', 'Description for Map 17', 'southafrica.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('South Africa', -31.293487641944, 25.825701551389, '572635543721309', currval('map_id_seq')),
('South Africa', -34.052955172778, 23.377799754722, '938566686726980', currval('map_id_seq')),
('South Africa', -34.304991756701, 18.820015153502, '178232877944746', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Egypt', 'Description for Map 18', 'egypt.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Egypt', 28.202161388889, 28.73586, '760463814834862', currval('map_id_seq')),
('Egypt', 24.096697, 32.892122, '527701081556756', currval('map_id_seq')),
('Egypt', 29.322949662773, 31.067067907787, '119488187267234', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Saudi Arabia', 'Description for Map 19', 'saudiarabia.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Saudia Arabia', 24.7845856, 46.397712699999, '1058168498662997', currval('map_id_seq')),
('Saudia Arabia', 20.292016016321, 40.114041035997, '765543077446375', currval('map_id_seq')),
('Saudia Arabia', 24.851194599998, 50.8864732, '1034703617530838', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Turkey', 'Description for Map 20', 'turkey.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Saudia Arabia', 38.421560369348, 35.122669233368, '709884303911373', currval('map_id_seq')),
('Saudia Arabia', 40.188142121569, 35.399258425882, '341414337393335', currval('map_id_seq')),
('Saudia Arabia', 36.707630599996, 33.117100100002, '1795403493953747', currval('map_id_seq'));

INSERT INTO map (title, description, image) VALUES
('Japan', 'Description for Map 1', 'japan.webp');
INSERT INTO location (country, latitude, longitude, resource_id, map_id) VALUES
('Japan', 33.96072589999707, 133.50603839999985, '1325381328343686', currval('map_id_seq')),
('Japan', 33.50845428000008, 135.74962500999982, '4628993663835160', currval('map_id_seq')),
('Japan', 33.50845428000008, 129.78858384894, '187350169922366', currval('map_id_seq')),
('Japan', 33.13475440466003, 133.12427554886995, '222649305976165', currval('map_id_seq')),
('Japan', 34.35550572125236, 142.40858758995148, '622358450049591', currval('map_id_seq')),
('Japan', 35.859397857049, 140.50351857112, '1059264774713644', currval('map_id_seq')),
('Japan', 35.0443050280398, 142.92075598361248, '191317532824734', currval('map_id_seq')),
('Japan', 37.836944444444, 139.0694156, '2334605166731298', currval('map_id_seq')),
('Japan', 37.990701899999, 140.6292889, '1098747938171888', currval('map_id_seq')),
('Japan', 32.08012540000004, 130.79814239999973, '838822217419466', currval('map_id_seq'));