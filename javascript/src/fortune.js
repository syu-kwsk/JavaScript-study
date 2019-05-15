

function changePage(tabkind) {
    var Url = window.location.href;
    Url = Url.slice( 0, Url.lastIndexOf('/'));

    window.location.href = Url + tabkind;
    
 

}
