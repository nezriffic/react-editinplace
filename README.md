# react-editinplace

Simple React component for editing in place.


### Installation
`npm install react-editinplace --save-dev`


### Example

```
var React = require('react'),
    EditInPlace = require('react-editinplace'),

    YourPage = React.createClass({
        getInitialState() {
            return {};

        },


        // validate input text
        _validate(text) {
            if (text.length > 0) {
                return true;
            }

            return false;

        },

        // save text to model etc.
        _onChange(text) {

        },

        render() {

            return <div className="yourpage">
                <EditInPlace
                    text="Some text"
                    editType="dblClick"
                    className="editinplace"
                    maxLength={10}
                    validate={this._validate}
                    activeClassName="active"
                    onChange={this._onChange} />
            </div>;

        }
    });

module.exports = YourPage;
```
