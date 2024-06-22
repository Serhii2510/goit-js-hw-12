import axios from 'axios';

export async function getImages(query, currentPage) {
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const params = new URLSearchParams({
        key: '44423384-360ba42c67bb4e928fcac247f',
        q: query,
        page: currentPage,
        per_page: 15,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
    });

    const url = `${BASE_URL}${END_POINT}?${params}`;

    const res = await axios.get(url);
    return res.data;
}