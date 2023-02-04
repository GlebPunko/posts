import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <div>
                <MyInput
                    value={filter.query}
                    onChange={e => setFilter({...filter, query: e.target.value})}
                    placeholder="search"
                />
            </div>
            <div>
                <MySelect
                    value={filter.sort}
                    onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                    defaultValue = "Sort"
                    options={[
                        {value: "title", name: "By name"},
                        {value: "body", name: "By description"}
                    ]}
                />
            </div>
        </div>
    );
};

export default PostFilter;