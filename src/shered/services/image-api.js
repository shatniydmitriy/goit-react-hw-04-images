import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api",
    params: {
        key: '29588079-fbc492831fdad231bf7222b96',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    },
});

export const searchImage = async (search, page)=> {
    const { data } = await instance.get('/', {
        params: {
            q: search,
            page,
        },
    });
    return data;
}