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

const getDateHoursToString = (date) => {
	return getDateToString(date) + " - " + getHoursToString(date)
}

const urlParams = new URLSearchParams(window.location.search);

const loadMaps = (adr) => {
	var setting = {
		"height": 528,
		"width": 803,
		"zoom": 17,
		"queryString": adr,
		"id": "map-9cd199b9cc5410cd3b1ad21cab2e54d3",
		"embed_id": "242157"
	};
	var d = document;
	var s = d.createElement('script');
	s.src = 'https://1map.com/js/script-for-user.js?embed_id=242157';
	s.async = true;
	s.onload = function (e) {
		window.OneMap.initMap(setting)
	};
	var to = d.getElementsByTagName('script')[0];
	to.parentNode.insertBefore(s, to);
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
	
	if(location.href.indexOf('detailsSoiree.html') > -1){
		$.ajax({
			url: URL + "party/get/" + urlParams.get('code'),
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				console.log(res)
				
				$("#dateSoiree").text(getDateToString(new Date(res.soiree[0].dateSoiree)))
				$("#heure").text(getHoursToString(new Date(res.soiree[0].heure)))
				$("#deadlinePref").text(getDateHoursToString(new Date(res.soiree[0].deadLinePref)))
				$("#deadlineVote").text(getDateHoursToString(new Date(res.soiree[0].deadLineVote)))
				$("#description").text(res.soiree[0].descriptionSoiree)
				$("#adresse").text(res.soiree[0].adresse)

				$(".maps").append("<iframe "+
					'width="600"'+
					'height="450"'+
					'frameborder="0" style="border:0"'+
					'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCXGZf_qoA20DFO83bnCJMEIhzbEJBkhSs'+
					  '&q=' + res.soiree[0].adresse + '" allowfullscreen>'+
				 ' </iframe>')
            },
            error: (err) => {
                //TODO: identifiants incorrects
            }
		});
	}
});
