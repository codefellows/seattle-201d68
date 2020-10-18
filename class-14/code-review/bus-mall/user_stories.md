Part of your assignment today is to write your own user stories. Be sure to consider the multiple roles involved: the marketing research team, the developer, and the focus group participant who will be using the application. Try to write 4-5 user stories for each role. DO THIS STEP FIRST in a file called user_stories.md. The commit logs in your repo will have a first couple of commits for the scaffolding process, but next you should have a 'user stories' commit that is in place before any code is written.

As a reminder, user stories typically take the form of, "As X, I want Y, so that Z" but do not necessarily need that structure.

A wise student would take about 30-45 minutes to work on the user stories and also draft a technical plan for the project (a detailed to-do list of things to make, step by step and tested at each stage) before getting into the code. That time spent in thought and planning will make the code flow a lot faster. Give yourself a series of little problems to solve (rather an a ginormous thing that you just wade through and poke at).

Set 'em up, and knock 'em down.

Plan your work, and work your plan.

Marketing Research Team:
1. As the marketing Team, I would like to connect with people in a wide variety of roles to query a targets product base.
  * Create a constructor function that creates an object associated with each product, and has the following properties:
      * Name of the product
      * File path of image  
      * Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.

2. As the marketing team, I would like to see those products induvidually, and how many times they were voted on.
3. As a marketing team, I would like to see the results in a clean and professionally easy-to-read way.

      * Attach an event listener to the section of the HTML page where the images are going to be displayed.

      * Once the users ‘clicks’ a product, generate three new products for the user to pick from.
The Developer:
1. As the developer, I would like to see a user friendly interface.
2. As the developer I would like to write an algorithum that is self-explainatary.
3. As the developer I would like to see results in a chart.
      * In the constructor function define a property to hold the number of times a product has been clicked.

      * After every selection by the viewer, update the newly added property to reflect if it was clicked.



The participants:
1. As a participant, I would like easy interactions to vote.
2. As a user I would like a nice looking page, that is easy to read and view.
3. As a user I would like to see my results.
