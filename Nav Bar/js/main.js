function loadQuestions(category) {
    // Fetch and load questions based on the selected category
    fetch(`../Aimee Prototype/${category}/Question 1/public/index.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading questions:', error));
}
