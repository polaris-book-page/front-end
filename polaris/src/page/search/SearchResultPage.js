import { useEffect, useState } from "react";
import axios from 'axios';

const SearchResultPage = () => {
    const [search, setSearch] = useState();

    const searchResultFunc = async () => {
        try {
            const result = await axios.get('ttb/api/ItemSearch.aspx?ttbkey=ttbsooyeon271641002&Query=aladdin&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101');
            console.log(result.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        searchResultFunc();
    }, [])

    return (<>SearchResultPage</>)
}

export default SearchResultPage;