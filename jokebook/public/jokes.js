"use strict";
(function () {
    window.addEventListener("load", init);
    function init() {
        let addButton = document.getElementById("add-btn");
        addButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });
    }
    function submitForm() {
        let params = new FormData(document.getElementById("add-joke-form"));
        let jsonBody = JSON.stringify(Object.fromEntries(params));
        const categoryIdInput = document.getElementById("category_id");
        const categoryId = categoryIdInput.value;
        fetch("/jokebook/joke/add", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: jsonBody
        })
            .then(checkStatus)
            .then(redirectTo(`/jokebook/joke/${categoryId}`))
            .catch(alert);
    }
    document.getElementById('search-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = document.getElementById('search-term').value.trim();
        if (searchTerm) {
            window.location.href = `/jokebook/joke/${encodeURIComponent(searchTerm)}`;
        }
    });
    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }
    function reload() {
        location.reload();
    }
    function redirectTo(url) {
        window.location.href = url;
    }

})();