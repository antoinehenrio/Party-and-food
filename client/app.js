const URL = "http://localhost:3000/api/";

const getFormData = ($form) => {
	var unindexed_array = $form.serializeArray();
	var indexed_array = {};

	$.map(unindexed_array, function (n, i) {
		indexed_array[n["name"]] = n["value"];
	});

	return indexed_array;
};

$(() => {
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
