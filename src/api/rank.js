import axios from 'axios';
import { HOST } from 'common/js/config'

export function getRank(id) {
    const url = HOST + `/playlist/detail?id=${id}`
    return axios.get(url);
}