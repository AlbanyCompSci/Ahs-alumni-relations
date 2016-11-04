const colorMap = {
    pink: '#ff4dff',
    purple: '#8c1aff',
    orange: '#ff6600',
    green: '#2eb82e'
}

$(document).ready(function() {
    // COOKIES, LOAD CORRECT YEAR
    if (!Cookies.get('active_class')) {
        Cookies.set('active_class', '2018');
    }

    if (!Cookies.get('active_tab')) {
        // Home, map, directory, homecomingyear
        Cookies.set('active_tab', 'home');
    }

    setNewYear(Cookies.get('active_class'));

    // YEAR SELECTED
    $('.classes-select > li').click(function() {
        let year = $(this).text();
        Cookies.set('active_class', year);
        setNewYear(year);
    });

    // TAB SELECTED
    $('.year-subtab').click(function() {
        if (!$(this).hasClass('color-active')) {
        
        } 
    });

    // STYLING
    function setColor(color) {
        $('.page-header > h1 > span').css({ color: color });
        $('.class-pills a').css({ color: color });
        $('.color-active a').css({ 'background-color': color });
        $('.color-active a:hover').css({'background-color': color});
    }

    function setHomecomingYears(year) {
        let yearInt = parseInt(year);
        $('.homecoming-dropdown > ul').empty();
        for (let i = 1; i < 5; i++) {
            $('.homecoming-dropdown > ul').append(`
                <li class='year-subtab'><a href='#'>${yearInt - i}</a></li>
            `);
        }
    }

    function setNewYear(year) {
        // Page header
        $('.page-header > h1 > span').empty().append(year);

        // Set the homecoming years
        setHomecomingYears(year);

        // Set color
        let color;
        if (year % 4 == 0) {
            color = "pink";
        } else if (year % 4 == 1) {
            color = "purple";
        } else if (year % 4 == 2) {
            color = "orange";
        } else {
            color = "green";
        }

        setColor(colorMap[color]);
    }
});