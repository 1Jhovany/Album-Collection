import api from "../APIcaller/API"
const content=document.getElementById("content");
const title=document.getElementById("title");

export default{
    displayAllAlbums,
    viewAddAlbum,
    SetupSaveButton,
}

export function viewAddAlbum()
{
    title.innerText="Add Album";
    content.innerHTML =
    `
        Title <input type="text" value="" id="album_title" />
        Artist <select id="listArtists"> </select>
        ImageURL <input type="text" value="" id="album_image" />
        Record Label <input type="text" value="" id="album_recordLabel" />
    <button id="btnSaveAlbum">Save Album</button>
    `
    const artistsSelectList = document.getElementById("listArtists")
    api.getRequest("https://localhost:44313/api/artist", artists =>
        {
            // artistsSelectList.innerHTML=
            // `
            //     ${artists.map(artist => '<option value="'+artist.id+'">'+artist.name+'</option>').join("")}
            // `
            artists.forEach(artist =>
            {
                var option = document.createElement("option");
                option.value = artist.id;
                option.innerText = artist.name;
                artistsSelectList.appendChild(option);

            });
        });

    SetupSaveButton(artistsSelectList)
}


function displayAllAlbums()
{
    title.innerText="Albums";
    api.getRequest("https://localhost:44313/api/album", displayAlbums);
    function displayAlbums(data)
    {
        content.innerHTML =
        `
        <ol>
            ${data.map(album => '<li>'+album.title+'</li><ul><li> Artist: '+album.artist.name+'</li><li> Record Label: '+album.recordLabel+'</li><li> Songs: '+album.song+'</li><li> Reviews: '+album.review+'</li><li> Image: ""</li></ul><button class="deleteAlbum" albumID='+album.id+'>Delete</button>').join("")}
        </ol>
        <button id="btnAddAlbum">Add Album</button>
        `
        let btnAddAlbum = document.getElementById("btnAddAlbum");
        btnAddAlbum.addEventListener("click", viewAddAlbum);
        let deleteButtons = Array.from(document.getElementsByClassName("deleteAlbum"));
        deleteButtons.forEach(deleteButton =>
        {
            deleteButton.addEventListener("click", function()
            {
                let id = deleteButton.getAttribute("albumId");
                console.log(id);
                SetupDeleteAlbum(id);
            });
        });
    }
}



export function SetupSaveButton(selectedArtist)
{
    let btnSave = document.getElementById("btnSaveAlbum");
    btnSave.addEventListener("click", function()
    {
        let albumTitle = document.getElementById("album_title").value;
        let albumImage = document.getElementById("album_image").value;
        let albumRecordLabel = document.getElementById("album_recordLabel").value;

        const Album = {
            Title: albumTitle,
            Image: albumImage,
            RecordLabel: albumRecordLabel,
            artistId: selectedArtist.value
        }
        console.log(Album)
        api.postRequest("https://localhost:44313/api/album", Album, displayAllAlbums);
    });
}

export function SetupDeleteAlbum(id)
{
    api.deleteRequest("https://localhost:44313/api/album/", id, displayAllAlbums);
    //let btnDeleteAlbum = document.getElementById("btnDeleteAlbum");
    // albumDeleteButtons.forEach(deleteButton => {
    //     deleteButton.addEventListener("click", function()
    //     {
    //         let id = deleteButton.getAttribute("albumId");
    //     });
    // });
}