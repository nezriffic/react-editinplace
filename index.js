/**
 * Edit in place React Component
 *
 * @author: Michal Sekula
 */

var React = require('react'),

    EditInPlace = React.createClass({

        MODES: {
            read: 0,
            edit: 1
        },

        propTypes: {
            validate: React.PropTypes.func,
            onChange: React.PropTypes.func,
            text: React.PropTypes.string.isRequired,
            maxLength: React.PropTypes.number,
            editType: React.PropTypes.string,
            className: React.PropTypes.string,
            activeClassName: React.PropTypes.string
        },

        getInitialState() {

            if (this.props.validate) {
                this._validate = this.props.validate;
            } else {
                this._validate = function () {
                    return true;
                };
            }

            return {
                text: this.props.text,
                mode: this.MODES.read
            };

        },

        _onCancel() {
            this.setState({
                mode: this.MODES.read
            });

        },

        _onKeyDown(e) {
            if (e && e.keyCode === 27) {
                this._onCancel();
            }

        },

        componentDidMount() {
            window.addEventListener('keydown', this._onKeyDown);

        },

        componentWillUnmount() {
            window.removeEventListener('keydown', this._onKeyDown);

        },

        _onDoubleClick(e) {
            e.preventDefault();

            if (this.state.mode === this.MODES.read) {
                this.setState({
                    mode: this.MODES.edit
                }, function () {
                    React.findDOMNode(this.refs.input).focus();
                    // to set cursor at the end
                    React.findDOMNode(this.refs.input).value = React.findDOMNode(this.refs.input).value;
                });
            }

        },

        _onClick(e) {
            this._onDoubleClick(e);

        },

        _onSave(e) {
            e.preventDefault();

            var node = React.findDOMNode(this.refs.input);

            if (node.value === this.state.text) {
                this.setState({
                    mode: this.MODES.read
                });
            } else if (this._validate(node.value)) {
                this.setState({
                    text: node.value,
                    mode: this.MODES.read
                }, function () {
                    if (this.props.onChange) {
                        this.props.onChange(this.state.text);
                    }
                });
            } else {
                node.focus();
            }

        },

        render() {
            var classname = this.props.className || 'editinplace',
                activeclassname = this.props.activeClassName || 'active';

            if (this.state.mode === this.MODES.edit) {
                return <div className={classname + ' ' + activeclassname}>
                    <form onSubmit={this._onSave}>
                        <input ref="input"
                               type="text"
                               defaultValue={this.state.text}
                               maxLength={this.props.maxLength}
                               onBlur={this._onSave} />
                    </form>
                </div>;

            }

            if (this.props.editType && this.props.editType.toLowerCase() === 'dblclick') {
                return <div className={classname} onDoubleClick={this._onDoubleClick}>{this.state.text}</div>;

            }

            return <div className={classname} onClick={this._onClick}>{this.state.text}</div>;

        }
    });

module.exports = EditInPlace;
