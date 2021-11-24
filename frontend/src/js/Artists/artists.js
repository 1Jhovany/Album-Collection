import api from "../APIcaller/API"
const content=document.getElementById("content");
const title=document.getElementById("title");

export default{
    viewArtists,
}

export function viewAddArtist()
{
    title.innerText="Add Artist";
    content.innerHTML =
    `
    <div class="addPage">
        Name <input type="text" value="" id="artist_name" />
        Artist <select id="listArtists"> </select>
        ImageURL <input type="text" value="" id="artist_image" />
        Record Label <input type="text" value="" id="artist_recordLabel" />
        <button id="btnSaveAlbum">Save Artist</button>
    </div>
    `
    const artistsSelectList = document.getElementById("listArtists")

    //populates select list for artist
    api.getRequest("https://localhost:44313/api/artist", artists =>
        {
            artists.forEach(artist =>
            {
                var option = document.createElement("option");
                option.value = artist.id;
                option.text = artist.name;
                artistsSelectList.appendChild(option);
            }); 
        });
        SetupSaveButton(artistsSelectList)
    }
function viewArtists()
{
    title.innerText="Artist";
    api.getRequest("https://localhost:44313/api/artist", displayArtist);

    function displayArtist(data)
    {
        content.innerHTML =
        `
        <ol>
            ${data.map(artist => "<img class='artistImage' src='"+artist.imageUrl+"'><li> <h4> Name: "+artist.name+"<h4></li><ul><li> Record Label: "+artist.recordLabel+"</li><li> Hometown: "+artist.hometown+"</li><li> Age: "+artist.age+"</li></ul><button class='editArtist' artistID="+artist.id+">Edit</button><button class='deleteArtist' artistID="+artist.id+">Delete</button>").join(" ")}
        </ol>
        <button id="btnAddArtist">Add Artist</button>
        `
        let btnAddArtist = document.getElementById("btnAddArtist");
        btnAddArtist.addEventListener("click", viewAddArtist);

        let editButtons = Array.from(document.getElementsByClassName("editArtist"));
        editButtons.forEach(editButton =>
        {
            editButton.addEventListener("click", function()
            {
                let id = editButton.getAttribute("artistId");
                viewEditArtist(id);
             });
        });

        let deleteButtons = Array.from(document.getElementsByClassName("deleteArtist"));
        deleteButtons.forEach(deleteButton =>
        {
            deleteButton.addEventListener("click", function()
            {
                 let id = deleteButton.getAttribute("artistId");
                 console.log(id);
                 setupDeleteArtist(id);
            });
        });
    }
}

export function SetupSaveButton(selectedArtist)
{
    let btnSave = document.getElementById("btnSaveArtist");
    btnSave.addEventListener("click", function()
    {
        let artistName = document.getElementById("artist_name").value;
        let artistImage = document.getElementById("artist_image").value;
        let artistRecordLabel = document.getElementById("artist_recordLabel").value;

        const Artist =
        {
            Name: artistName,
            imageUrl: artistImage,
            RecordLabel: artistRecordLabel,
            artistId: selectedArtist.value
        }
        console.log(Artist)
        api.postRequest("https://localhost:44313/api/artist", Artist, displayArtist());
    });
}

function viewEditArtist(id)
{
    title.innerText = "Edit Artist";
    let selectedArtist;
    api.getRequest("https://localhost:44313/api/artist/"+id, artist =>
    {
        content.innerHTML =
        `
        <div class="editPage">
            Name <input type="text" value="${artist.name}" id="artist_name" />
            ImageURL <input type="text" value="${artist.image}" id="artist_image" />
            Record Label <input type="text" value="${artist.RecordLabel}" id="artist_recordLabel" />
            Age <input type="text" value="${artist.age}" id="artist_age" />
            <button id="btnSaveEdit">Save Artist</button>
        </div>
        `
        const artistsSelectList = document.getElementById("listArtists")
        api.getRequest("https://localhost:44313/api/artist", artists =>
        {
            artists.forEach(artist =>
                {
                    var option = document.createElement("option");
                    option.value = artist.id;
                    option.text = artist.name;
                    if(artist.id==album.artistId)
                        {option.setAttribute("selected","");
                        selectedArtist = album.artistId
                        }
                    artistsSelectList.appendChild(option);
                });

        });
        let btnSaveEdit = document.getElementById("btnSaveEdit");
        btnSaveEdit.addEventListener("click", function()
        {
            let artistTitle = document.getElementById("artist_name").value;
            let artistImage = document.getElementById("artist_image").value;
            let artistRecordLabel = document.getElementById("artist_recordLabel").value;

            const Artist = 
            {
                Id: id,
                Name: artistTitle,
                imageUrl: artistImage,
                recordLabel: artistRecordLabel,
                artistId: String(selectedArtist)
            }
            console.log(Artist)
            api.putRequest("https://localhost:44313/api/artist/",id, Artist, viewArtists);
        });
    });  
}

export function setupDeleteArtist(id)
{
api.deleteRequest("https://localhost:44313/api/artist/", id, viewArtists);
}