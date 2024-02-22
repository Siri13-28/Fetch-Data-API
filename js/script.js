const apiWebinarsUrl = 'https://jsonplaceholder.typicode.com/photos';
const apiPopularUrl = 'https://jsonplaceholder.typicode.com/albums';

const limitItems = 10;
let offsetWebinars = 4980;
let offsetPopular = 50;
let totalWebinars = 0;
let totalPopular = 0;

async function callApi(apiType) {
    const { apiUrl, offsetKey, listElementId, buttonId } = apiType;
    const response = await fetch(`${apiUrl}?_limit=${limitItems}&_start=${offsetKey}`);
    const data = await response.json();
    const totalCountHeader = response.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;
    displayData(data, listElementId);

    apiType.offsetKey += limitItems;
    apiType.totalItems = totalCount;

    if (apiType.offsetKey >= apiType.totalItems) {
        document.getElementById(buttonId).style.display = 'none';
    }
}

function displayData(currypayload, containerId) {
    var archiveList = document.getElementById(containerId);

    currypayload.forEach(webinar => {
        var html = `
        <div class="product">
            <p>${webinar.id}</p>
            <h3 class="title">${webinar.title}</h3>
        </div>
        `;

        archiveList.insertAdjacentHTML('beforeend', html);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const fetchWebinarsButton = document.getElementById('fetch-webinars-button');
    const fetchPopularButton = document.getElementById('fetch-popular-button');

    const webinarsApi = {
        apiUrl: apiWebinarsUrl,
        offsetKey: offsetWebinars,
        totalItems: totalWebinars,
        listElementId: 'archiveList',
        buttonId: 'fetch-webinars-button'
    };

    const popularApi = {
        apiUrl: apiPopularUrl,
        offsetKey: offsetPopular,
        totalItems: totalPopular,
        listElementId: 'popularList',
        buttonId: 'fetch-popular-button'
    };

    fetchWebinarsButton.addEventListener('click', async () => {
        await callApi(webinarsApi);
    });

    fetchPopularButton.addEventListener('click', async () => {
        await callApi(popularApi);
    });

    // Initial auto-fetch
    await callApi(webinarsApi);
    await callApi(popularApi);
});