/*
	Typescript target version: ES6 (to allow Babel and Webpack to read and bundle js transpiled file)
 */
//import * as React from "react-native";
import React, {StyleSheet, Text, PropTypes, View, Component} from "react-native";

let styles = StyleSheet.create({
	container: {
		flex: 1,
		transform: [{rotate: '50deg'}],
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "black"
	}
});

let toto : React.color;

class App extends Component<any, any> {
	static propTypes = {
		testPropTypes: PropTypes.string
	};

	public _onLayout(event:React.EventLayout):void {
		this.setState({
			changeWidth: event.nativeEvent.layout.width - 6,
			changeHeight: event.nativeEvent.layout.height - 6
		});
	}

	render() {
		return (
			<View style={styles.container} onLayout={this._onLayout} onAccessibilityTap={() => {}}>
				<Text>
					Test Typescript React-Native Ayoub
					</Text>
			</View>
		)
	}
}

export default App;
