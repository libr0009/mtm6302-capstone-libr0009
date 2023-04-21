# mtm6302-capstone-libr0009

Name: Gabrielle Librado
Student #: 041037233
Project to complete: Pokedex.


Part:2
Design:
    Simple grid layout system. The user clicks on a pokemon thumbnail and a pop up that displays a larger image of the pokemon with additional details in a pokemon card layout. From there you have the option to catch the pokemon and it will add it to their caught list and also will be blacked out than the rest of the uncaught pokemon in the grid system. Clicking on a caught pokemon will bring back the pokemon card pop up and there they have the option to release.

Part:3
Creating the prototype:

    1) The title (H1) "Pokemon":
        I styled the text to it's size and colour, then added a outline stroke with a secondary colour to fit the pokemon colour palette.
        I used the  -webkit-text-stroke property to execute that.
        I realized it needed something to make it pop, so I added a text shadow using the text-shadow property with
        -1px 1px 2px #000,
        1px 2px 6px #000,
        1px -1px 0 #000,
        -1px -1px 0 #000; values.

    2) The grid:
        I I used a simple css grid system.
        display: grid;
        grid-template-columns: repeat(5, 1fr); : creates 4 columns of equal width.
        grid-template-rows: repeat(4, 1fr); : creates 5 rows of equal height.
        gap: 5px; : adds 10px of space between each grid item 

        For every individual box:
        .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .item-7, .item-8, .item-9, .item-10, .item-11, .item-12, .item-13, .item-14, .item-15, .item-16, .item-17, .item-18, .item-19, .item-20 {
        background-color: white; : sets the background color of each grid item to gray .
        height: 70px; : sets the height of each grid item to 70px

    3) Different screen types:
        @media screen and (max-width: 390px) This is for small mobile devices.

        I made the h1 a smaller text size to properly fit the screen while maintaining in a readable size.

        I made the individual boxes a 10px bigger in height so that it is easier to click for mobile users.

        For the grid system I made it 5x2 to properly fit better for smaller screens.


        @media screen and (min-width:391px) and (max-width: 820px) is for Ipad/tablet devices.

        I just adjusted the grid system to be 4x5 to properly fit better for the given screen size

}   

Part:4

    my javascript code first sets the pokeAPI URL for fetching Pokemon data and selects the element for displaying the Pokemon grid. It then creates 20 empty div elements with the class "pokemon" and puts them to the grid.
    It then uses the fetch API to fetch data from the pokeAPI URL, and uses the response to display the pokemon's name and thumbnail image in the grid. It also adds an event listener to the "Load More" button at the bottom of the webpage that fetches the next 20 pokemon and adds them to the grid.

    I then created a modal element to display the pokemon details, and uses local storage to store a list of caught pokemon. It defines a function to fetch Pokemon data asynchronously, and another function to display the Pokemon data in the grid. The display function uses the getPokemonData function to fetch data for each Pokémon, creates a div element with the Pokémon's name and image, and appends it to the grid. It also adds an event listener to each Pokémon div element that displays the Pokémon's details in the modal popup.

    The modal popup shows the pokemon's image, height, weight, type, and a button to mark it as caught. Ifa user clicks the "caught" button, the name of the pokemon is added to the caught pokemon list stored in local storage, the button is disabled, and the text on the button changes to "Caught!".

    I had to change my css stylesheet to work with the javascript. I realized that creating 20 individual divs to make a grid was unnecesary and that I can just create one from javascript with the PokeAPI.

    .item-1, .item-2, .item-3, .item-4, .item-5, .item-6, .item-7, .item-8, .item-9, .item-10, .item-11, .item-12, .item-13, .item-14, .item-15, .item-16, .item-17, .item-18, .item-19, .item-20  