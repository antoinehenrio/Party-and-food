const URL = "http://localhost:3000/api/";

const getFormData = ($form) => {
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function (n, i) {
		indexed_array[n["name"]] = n["value"];
	});

	return indexed_array;
};

const getDateToString = (date) => {
	return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

const getHoursToString = (date) => {
	return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
}

$(() => {
    // Récupération lorsqu'on est sur la page d'accueil
    if(location.href.indexOf('acceuil') > -1){
        $.ajax({
			url: URL + "party/get",
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				$("#nbSoiree").text(res.soiree.length)

				console.log(res)

				for(let soiree of res.soiree){
					//Date soirée
					$(".tableauAccueil").append("<div>" + getDateToString(new Date(soiree.dateSoiree)) + "</div>")
					//Heure soirée
					$(".tableauAccueil").append("<div>" + getHoursToString(new Date(soiree.heure)) + "</div>")
					//Organisateur
					$(".tableauAccueil").append("<div>" + soiree.organisateur.firstname + " " + soiree.organisateur.name + "</div>")
				}
                
			},
		});

		$.ajax({
			url: URL + "user/get",
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				$("#firstname").text(res.user.firstname)
                console.log(res)
			},
		});
    }

	$(".inscription-form").on("submit", (e) => {
		e.preventDefault();
		console.log(getFormData($(".inscription-form")));
		$.ajax({
			url: URL + "user/register",
			type: "POST",
			dataType: "json",
			data: getFormData($(".inscription-form")),
			success: (res) => {
                localStorage.setItem("token", res.token)
                location.replace("acceuil.html")
			},
		});
    });
    
    $(".login-form").on("submit", (e) => {
		e.preventDefault();
		$.ajax({
			url: URL + "user/login",
			type: "POST",
			dataType: "json",
			data: getFormData($(".login-form")),
			success: (res) => {
                localStorage.setItem("token", res.token)
                location.replace("acceuil.html")
            },
            error: (err) => {
                //TODO: identifiants incorrects
            }
		});
    });

    $("#party-form").on('submit', (e) => {
        e.preventDefault()
        $.ajax({
			url: URL + "party/create",
			type: "POST",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			data: getFormData($("#party-form")),
			success: (res) => {
                console.log(res)
            },
            error: (err) => {
                //TODO: identifiants incorrects
            }
		});
    })
});
