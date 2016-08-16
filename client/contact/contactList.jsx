var ContactList = React.createClass({
    getInitialState: function() {
        return {
            contactsData: [],
            contactEditState: {editMode: false}
        }
    },
    getContacts:function(){
        $.ajax({
            url: serverAttr + "/contact",
            method: "GET"
        }).success(function(res){
            this.setState({
                contactsData: res.data,
                contactEditState: this.CreateContactEditState(res.data.length)
            });
            this.dataUpdate(res.data);

        }.bind(this));
    },
    componentDidMount: function() {
        this.getContacts();
    },
    componentWillUpdate: function() {
        this.updateContactDataPlaceholder();
    },
    CreateContactEditState: function(sum) {
        var i = 0;
        var emptyStateObject = [];
        while(i < sum) {
            emptyStateObject[i] = {};
            emptyStateObject[i].telephone = "";
            emptyStateObject[i].name = "";
            emptyStateObject[i].surname = "";
            emptyStateObject[i].editMode = false;
            i++;
        }
        return emptyStateObject;
    },
    updateContactDataPlaceholder: function() {
        if(this.state.contactsData.length != this.state.contactEditState.length){
            var newContactSum = this.state.contactsData.length - this.state.contactEditState.length;
            var ContactPlaceholderSum = this.state.contactEditState.length;
            var updatedPlaceholder = this.state.contactEditState;

            for(i=ContactPlaceholderSum; i<ContactPlaceholderSum+newContactSum; i++){
                updatedPlaceholder[i] =  this.newContactPlaceholder(i);
                this.setState({contactEditState: updatedPlaceholder});
            }
        }
    },
    newContactPlaceholder: function(index) {
        var array = {};
        array.telephone = "";
        array.name = "";
        array.surname = "";
        array.editMode = false;
        return array;
    },
    dataUpdate: function(data) {
        this.props.onListDataUpdate(data);
    },
    render: function() {
        return(
            <Contacts mainData={this.props.mainData} data={this.state.contactsData} onListDataUpdate={this.dataUpdate} editStates={this.state.contactEditState}/>
        )
    }
});
var Contacts = React.createClass({
    render: function() {
        return (
            <tbody>
                {this.props.data.map((contact,i) =>
                    <tr>
                        <td>{this.props.editStates[i].editMode ? <EditTextArea index={i} name={contact.name} title="name" onContactChange ={this.onContactChange}/> : contact.name }</td>
                        <td>{this.props.editStates[i].editMode ? <EditTextArea index={i} name={contact.surname} title="surname" onContactChange ={this.onContactChange}/> : contact.surname }</td>
                        <td>{this.props.editStates[i].editMode ? <EditTextArea index={i} name={contact.telephone} title="telephone" onContactChange ={this.onContactChange}/> : contact.telephone }</td>
                        <td>{this.props.editStates[i].editMode ? <ConfirmEditButton index={i} onConfirmEdit={this.onConfirmEdit}/> : <EditContactButton index={i} onEdit={this.onEdit}/> }</td>
                        <td><DeleteContactButton index={i} onDelete={this.onDelete}/></td>
                    </tr>
                )}
            </tbody>
        )
    },
    onDelete: function(index) {
        var id = this.props.data[index]["_id"];
        var updated_data = this.props.data.splice(index, 1);
        var updated_editState = this.props.editStates.splice(index, 1);
        this.deleteContact(id,updated_data,updated_editState);
    },
    onEdit: function(index) {
        var editStates = this.props.editStates;
        editStates[index].editMode = true;
        this.setState({contactEditState: editStates});
    },
    onConfirmEdit: function(index) {
        var id = this.props.data[index]["_id"];
        var editStates = this.props.editStates;
        var editedContacts = this.props.data;

        editStates[index].editMode = false;
        editStates[index].name = (editStates[index].name == "") ? editedContacts[index].name : editStates[index].name;
        editStates[index].surname = (editStates[index].surname == "") ? editedContacts[index].surname : editStates[index].surname;
        editStates[index].telephone = (editStates[index].telephone == "") ? editedContacts[index].telephone : editStates[index].telephone;


        editedContacts[index].name = editStates[index].name;
        editedContacts[index].surname = editStates[index].surname;
        editedContacts[index].telephone = editStates[index].telephone;

        this.updateDateContactInServer(id,index,editStates,editedContacts);
        this.props.onListDataUpdate(this.props.mainData);
    },
    onContactChange: function(name, index,e) {
        var editStates = this.props.editStates;
        if(e.target.value != "") {
            editStates[index][name] = e.target.value;
            this.setState({contactEditState: editStates});
        }
    },
    deleteContact: function(id,updated_data,updated_editState) {
        $.ajax({
            url: serverAttr + "/contact/"+id,
            method: "DELETE",
        }).success(function(res){
            this.setState({
                data: updated_data,
                editState: updated_editState
            });
        }.bind(this));
    },
    updateDateContactInServer: function (id,index,editStates,editedContacts) {
        console.log(editedContacts[index]);
        $.ajax({
            url: serverAttr + "/contact/"+id,
            method: "PUT",
            data: editedContacts[index]
        }).success(function(res){
            this.setState({
                contactEditState: editStates,
                contactsData: editedContacts
            });
        }.bind(this));
    }
});


var DeleteContactButton = React.createClass({
    render: function() {
        return (<button type="button" className="btn btn-danger btn-xs" title="Delete" onClick={this.deleteContact} ><span className="glyphicon glyphicon-trash"></span></button>)
    },
    deleteContact: function() {
        this.props.onDelete(this.props.index);
    }
});

var EditContactButton = React.createClass({
    render: function() {
        return (<button type="button" className="btn btn-primary btn-xs" title="Edit" onClick={this.editContact}><span className="glyphicon glyphicon-pencil"></span></button>)
    },
    editContact: function() {
        this.props.onEdit(this.props.index);
    }
});

var EditTextArea = React.createClass({
    render: function() {
        return (
            <input type="text" onChange={this.inputChange} defaultValue={this.props.name}/>
        )
    },
    inputChange: function() {
        this.props.onContactChange(this.props.title, this.props.index,event);
    }
});

var ConfirmEditButton = React.createClass({
    render: function() {
        return (<button type="button" className="btn btn-success btn-xs" title="Approved" onClick={this.confirmEdit}><span className="glyphicon glyphicon-ok"></span></button>)
    },
    confirmEdit: function() {
        this.props.onConfirmEdit(this.props.index);
    }
});

var RefreshButton = React.createClass({
    render: function() {
        return (<a href="#" className="btn btn-primary btn-sm btn-block" role="button"><span className="glyphicon glyphicon-refresh"></span> More</a>)
    }
});
