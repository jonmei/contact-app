var ContactsBox = React.createClass({
    getInitialState: function() {
        return {
            contactData: []
        }
    },
    updateState: function(data) {
        this.setState({contactData: data});
    },
    render: function() {
        return(
            <div className="container">
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th width="19%">Name</th>
                            <th width="19%">Surname</th>
                            <th width="19%">Telephone</th>
                            <th width="1%">Edit</th>
                            <th width="1%">Delete</th>
                        </tr>
                        </thead>
                        <ContactList mainData={this.state.contactData} onListDataUpdate={this.updateState}/>
                        <ContactForm mainData={this.state.contactData} onListDataUpdate={this.updateState}/>
                    </table>
                </div>
            </div>
        )
    }
});
React.render(<ContactsBox/>,document.getElementsByClassName("contactContainer")[0]);