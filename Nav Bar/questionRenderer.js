function renderQuestion(category, questionNumber) {
    // Construct the path to the HTML file based on category and question number
    const filePath = `./AimeePrototype/${category}/Question${questionNumber}/public/index.html`;

    // Fetch the HTML content
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch HTML. Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Inject the HTML content into the content-container
            document.getElementById('content-container').innerHTML = html;

            // Add event listeners or perform other actions if needed
            initializeQuestionListeners(category, questionNumber);
        })
        .catch(error => console.error('Error fetching HTML:', error));
}

function initializeQuestionListeners(category, questionNumber) {
    // Add event listeners based on category and question number
    var notificationOptions = document.getElementById("yes");
    if (notificationOptions) {
        notificationOptions.addEventListener("click", function (e) {
            // Handle 'Yes' button click
            console.log(`Category: ${category}, Question Number: ${questionNumber}, User selected 'Yes'`);
        });
    }

    var groupButton = document.getElementById("no");
    if (groupButton) {
        groupButton.addEventListener("click", function (e) {
            // Handle 'No' button click
            console.log(`Category: ${category}, Question Number: ${questionNumber}, User selected 'No'`);
        });
    }
}