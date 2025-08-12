<?php
// create-server.php
$apiKey = "API_KEY_DE_LA_PTERODACTYL"; // NU pune asta în HTML!

$data = [
    "name" => "Server Test",
    "user" => 1,
    "egg" => 1,
    "docker_image" => "ghcr.io/pterodactyl/yolks:java_17",
    "startup" => "java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar server.jar",
    "limits" => [
        "memory" => 1024,
        "disk" => 2048,
        "cpu" => 0
    ]
];

$ch = curl_init("https://panel.minehant.ro/api/application/servers");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $apiKey",
    "Content-Type: application/json",
    "Accept: Application/vnd.pterodactyl.v1+json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
