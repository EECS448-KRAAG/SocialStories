import SearchResults from 'react-filter-search'
import React from 'react'

let courses= [ 
    {
        name: "EECS 448",
        content: "This is a cool class. Learn Github",
        creator: "Antonette Gichohu"
    },
    {
        name: "EECS 210",
        content: "One of the harder courses, definitely memorize what they tell you to",
        creator: "Karen Setiawan"
    },
    {
        name: "EECS 368",
        content: "Great stuff",
        creator: "Antonette Gichohu"
    },
    {
        name: "EECS 268",
        content: "Lol, good luck",
        creator: "Antonette Gichohu"
    }
];


class ResultFilter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            courses: [],
            value: ''
        };
    }

    componentWillMount()
    {
        // Window.fetch('api/courses')
        // .then(response=> response.json())
        // .then(json=> this.setState({data: json}));

        this.setState({data:courses})
    }

    handleChange = event =>
    {
        const { value } = event.target;
        this.setState({value});
    };

    render()
    {
        const {data, value} = this.state;

        return(
            <div>
                <input type="text" value={value} onChange={this.handleChange} />
                <SearchResults
                    value={value}
                    data={data}
                    renderResults = { results => (
                    <div>
                        {results.map(el => (
                            <div>
                                <span>{el.name}</span>
                            </div>
                        ))}
                    </div>
                )} 
                />
            </div>
        );
    }
    
}

export default ResultFilter;