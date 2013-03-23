<?php

$keyids = array();

array_push($keyids,array('id'=>'id10',		'name'=>'xx運用管理',	'desc'=>'本番環境用アカウント'));
array_push($keyids,array('id'=>'id12',		'name'=>'xx開発管理',	'desc'=>'開発環境用アカウント'));
array_push($keyids,array('id'=>'id13',		'name'=>'xx検証管理',	'desc'=>'開発検証用アカウント'));
array_push($keyids,array('id'=>'id14',		'name'=>'xx管理',	'desc'=>'テスト、検証用アカウント'));
array_push($keyids,array('id'=>'id15',		'name'=>'xx管理',	'desc'=>'xx構築用'));
array_push($keyids,array('id'=>'id16',				'name'=>'xx管理',	'desc'=>'xx開発用環境'));
array_push($keyids,array('id'=>'id17',				'name'=>'xx管理',	'desc'=>'テスト、検証用アカウント'));


echo json_encode(array('success'=>true,'items'=>$keyids));
