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
	return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getUTCMinutes()).slice(-2)
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
    if(location.href.indexOf('accueil') > -1){
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
					$(".tableauAccueil").append("<a href='detailsSoiree.html?code=" + soiree.code + "' class='lienSoiree'><div>" + getDateToString(new Date(soiree.dateSoiree)) + "</div></a>")
                    //Heure soirée
                    $(".tableauAccueil").append("<a href='detailsSoiree.html?code=" + soiree.code + "' class='lienSoiree'><div>" + getHoursToString(new Date(soiree.heure)) + "</div></a>")
                    //Organisateur
                    $(".tableauAccueil").append("<a href='detailsSoiree.html?code=" + soiree.code + "' class='lienSoiree'><div>" + soiree.organisateur.firstname + " " + soiree.organisateur.name + "</div></a>")
				}
                
			},
			error: (err) => {
				if(err.status == 401){
					location.replace('inscription.html')
				}
			}
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
	
	$("#join-soiree").on('submit', (e) => {
		e.preventDefault()

		$.ajax({
			url: URL + "party/join/" + $("#codeSoiree").val(),
			type: "POST",
			dataType: "json",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
			},
			success: (res) => {
				location.replace("accueil.html")
			}
		});
	})

	/************** INSCRIPTION *********/

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
                location.replace("accueil.html")
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
                location.replace("accueil.html")
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
	
	/************* DETAILS SOIREE ******************/

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
				
				$("#dateSoiree").text(getDateToString(new Date(res.soiree.dateSoiree)))
				$("#heure").text(getHoursToString(new Date(res.soiree.heure)))
				$("#deadlinePref").text(getDateHoursToString(new Date(res.soiree.deadLinePref)))
				$("#deadlineVote").text(getDateHoursToString(new Date(res.soiree.deadLineVote)))
				$("#description").text(res.soiree.descriptionSoiree)
				$("#adresse").text(res.soiree.adresse)
				$(".Password").val(res.soiree.code)
				$("#prefLink").attr('href', "mesPreferences.html?code=" + res.soiree.code)
				
				if(new Date(res.soiree.deadLineVote) < new Date()) {
					$("#prefLink").attr("href", "platFinalUser.html?code=" + res.soiree.code)
					$("#prefLink input").val('Accéder au plat final')
				}
				else if(new Date(res.soiree.deadLinePref) < new Date()) {
					$("#prefLink").attr("href", "vote.html?code=" + res.soiree.code)
					$("#prefLink input").val('VOTE POUR TON PLAT PREFERE')

					let theSoiree = res.soiree

					$.ajax({
						url : URL + 'poll/get/' + urlParams.get('code'),
						type: "GET",
						dataType: "json",
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("token")}`,
						},
						success: (res) => {
							console.log(res)
							if(res.vote) {
								$("#prefLink").empty()
								$("#prefLink").attr("href", "#")
								$("#prefLink").replaceWith('<span class="subTitleContenu">LE PLAT CHOISI SERA DISPONIBLE DES LE ' + getDateToString(new Date(theSoiree.deadLineVote)) + ' A ' + getHoursToString(new Date(theSoiree.deadLineVote)) + '</p>')
							}
						},
						error: (err) => {
			
						}
					})
				}

				$(".maps").append("<iframe "+
					'frameborder="0" style="border:0"'+
					'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCXGZf_qoA20DFO83bnCJMEIhzbEJBkhSs'+
					  '&q=' + res.soiree.adresse + '" allowfullscreen>'+
				 ' </iframe>')
            },
            error: (err) => {
                
            }
		});
	}

	/************* PREFERENCES ******************/

	let soiree_id;

	if(location.href.indexOf('mesPreferences.html') > -1){

		$.ajax({
			url: URL + "party/get/" + urlParams.get('code'),
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				soiree_id = res.soiree[0]._id
            },
            error: (err) => {
                
            }
		});

		$.ajax({
			url: URL + "category/get",
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				console.log(res)

				$("#categ").empty()

				$("#categ").append('<span class="arrowCarrousel"><i class="fa fa-chevron-left"></i></span>')
				for(let category of res.categorie){
					$("#categ").append('<div data-id="' + category._id + '" class="photoCategorie" onclick="changeCouleur(this);">' + 
						'<img src="images/' + category.photoURL + '" height="50" width="50">' +
					'</div>')
				}
				
				
				$("#categ").append('<span class="arrowCarrousel"><i class="fa fa-chevron-right"></i></span>' +
				'<span class="nomCategorie"></span>')

				for(let category of res.categorie){
					$("#categ").append('<span class="nomCategorie">' + category.nomCategorie + '</span>')
				}

				$("#categ").append('<span class="nomCategorie"></span>')
            },
            error: (err) => {
                
            }
		});

		$.ajax({
			url: URL + "ingredient/get",
			type: "GET",
            dataType: "json",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
			success: (res) => {
				console.log(res)

				$("#likes").empty()
				$("#dislikes").empty()

				$("#likes").append('<span class="arrowCarrousel"><i class="fa fa-chevron-left"></i></span>')
				$("#dislikes").append('<span class="arrowCarrousel"><i class="fa fa-chevron-left"></i></span>')
				for(let i = 0; i < 4; i++){
					$("#likes").append('<div data-id="' + res.ingredient[i]._id + '" class="photoPreference" onclick="changeCouleur(this);">'+
						'<img src="images/' + res.ingredient[i].photoURL + '" height="50" width="50">'+
					'</div>')
					$("#dislikes").append('<div data-id="' + res.ingredient[i]._id + '" class="photoPreference" onclick="changeCouleur(this);">'+
						'<img src="images/' + res.ingredient[i].photoURL + '" height="50" width="50">'+
					'</div>')
				}
				
				
				$("#likes").append('<span class="arrowCarrousel"><i class="fa fa-chevron-right"></i></span>')
				$("#dislikes").append('<span class="arrowCarrousel"><i class="fa fa-chevron-right"></i></span>')
			},
            error: (err) => {
            
            }
		});

		// Envoyer le formulaire de préférence au serveur
		$("#pref-form").on('submit', (e) => {
			e.preventDefault()

			let pref = {
				soiree : soiree_id,
				categorie : [],
				souhaits : [],
				rejets : []
			}

			$("#categ .red").each(function() {
				pref.categorie.push($(this).data('id'))
			})

			$("#likes .red").each(function() {
				pref.souhaits.push($(this).data('id'))
			})

			$("#dislikes .red").each(function() {
				pref.rejets.push($(this).data('id'))
			})

			$.ajax({
				url: URL + "preference/create",
				type: "POST",
				dataType: "json",
				data: pref,
				headers: {
					'Authorization': `Bearer ${localStorage.getItem("token")}`,
				},
				success: (res) => {
					console.log(res)
				},
				error : (err) => {

				}
			})
		})
	}

	/************* VOTE ******************/

	//Sélection
	$('.voterepas').on('click', '.div1', function(){
		//Retirer les autres sélections si elles existent
		$(".voterepas .red").each(function() {
			$(this).removeClass('red')
		})
		$(this).addClass('red')
	})

	$('.checkvote').on('click', function(){
		let plat_id;

		$(".voterepas .red").each(function() {
			plat_id = $(this).data('id')
		})

		if(!plat_id) return

		$.ajax({
			url: URL + "poll/create/" + urlParams.get('code'),
			type: "POST",
			dataType: "json",
			data: {plat : plat_id},
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
			},
			success: (res) => {
				console.log(res)
				location.replace("detailsSoiree.html?code=" + urlParams.get('code'))
			},
			error : (err) => {

			}
		})
	})

	if(location.href.indexOf('vote.html') > -1){
		$.ajax({
			url: URL + "dish/poll/" + urlParams.get('code'),
			type: "GET",
			dataType: "json",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
			},
			success: (res) => {
				console.log(res)

				$('.voterepas').empty()

				for(let plat of res.plats){
					$('.voterepas').append(
						'<div class="div1" data-id="' + plat._id + '"><img class="milk" src="images/' + plat.photoURL + '"></div>' +
						'<div class="lignevote">' +
							'<div class="div2"><b class="bluetext">' + (plat.categorie.nomCategorie || "") + '</b></div>' +
							'<div class="div3"><p class="bluetext">' + plat.nomPlat + '</p></div>' +
						'</div>'
					)
				}
			},
			error : (err) => {

			}
		})
	}

	/************* MES SOIREES ******************/

	if(location.href.indexOf('mesSoirees.html') > -1){
		
	}

	/************* PLAT FINAL ******************/

	if(location.href.indexOf('platFinalUser.html') > -1){
		$.ajax({
			url: URL + "dish/get/selected/" + urlParams.get('code'),
			type: "GET",
			dataType: "json",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
			},
			success: (res) => {
				console.log(res)

				$('.containerPlatFinal').empty()

				$('.containerPlatFinal').append(
					'<div class="milk">' +
						'<img src="./images/' + res.plat.photoURL + '" alt="logo milk" class="logoMilk">' +
					'</div>' +
					'<div class="containerCat">' +
						'<h3 class="choixCat">' + (res.plat.categorie.nomCategorie || "") + '</h3>' +
						'<div class="choixPlat">' + res.plat.nomPlat + '</div>' +
					'</div>'
				)
			},
			error : (err) => {

			}
		})
	}
});
