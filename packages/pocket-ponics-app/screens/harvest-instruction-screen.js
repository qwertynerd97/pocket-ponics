import React from 'react';
import { 
	StyleSheet, 
	Text, 
	View, 
	ImageBackground,
	Image,
	Dimensions,
	TouchableOpacity
} from 'react-native';



const tomatoImage = require('../assets/tomato.png')
const greenbeanImage = require('../assets/greenbean.png')
const spinachImage = require('../assets/spinach.png')
const turnipImage = require('../assets/turnip.png')

const { width: WIDTH } = Dimensions.get('window')


export default class Example extends React.Component {

	getReadableName(name) {
		switch(name) {
			case 'tomato':
				return 'Tomatoes'
			case 'greenbeans':
				return 'Green Beans'
			case 'spinach':
				return 'Spinach'
			case 'turnip':
				return 'Turnips'
		}
	}

	One(name) {
		switch(name) {
			case 'Tomatoes':
				return 'With one hand, hold the stem of the plant. With the other hand, grasp the fuit firmly yet gently.'
			case 'Green Beans':
				return 'With one hand, hold the stem of the plant. With the other hand, grasp the top of the green bean firmly.'
			case 'Spinach':
				return 'To harvest your spinach, you will need a pair of scissors'
			case 'Turnip':
				return 'Turnips'
		}
	}

	Two(name) {
		switch(name) {
			case 'Tomatoes':
				return 'Pull the fruit away from the stem, breaking the stalk just above the calyx(star-shaped leaves on top of the tomato).'
			case 'Green Beans':
				return 'gently pull the pod away from the stem, breaking it off the vine'
			case 'Spinach':
				return 'Simply cut off the leaves as close to the root as you can. Your spinach plant will continue regrowing these leaves until you decide to remove the entire plant.'
			case 'Turnip':
				return 'Turnips'
		}
	}

	Three(name) {
		switch(name) {
			case 'Tomatoes':
				return 'Enjoy your tomatoes, and start thinking about what you want to grow next!'
			case 'Green Beans':
				return 'Enjoy your green beans, and start thinking about what you want to grow next!'
			case 'Spinach':
				return 'Enjoy your spinach, and start thinking about what you want to grow next!'
			case 'Turnip':
				return 'Turnips'
		}
	}

	render() {
		const name = this.props.navigation.getParam('name')
		return (
			<View style={styles.backgroundContainer}>
				<Text style={styles.value}>
					<Text style={styles.valueName}>instructions for harvesting:</Text> {name}
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 1:</Text> {this.One(name)} 
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 2:</Text> {this.Two(name)}
				</Text>

				<Text style={styles.value}></Text>

				<Text style={styles.value}>
					<Text style={styles.valueName}>Step 3:</Text> {this.Three(name)}
				</Text>
			</View>
		)
	}	

}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		width: null,
		height: null,
		alignItems: 'center',
		backgroundColor: '#472600'
	},
	plantImage: {
		width: 250,
		height: 175,
		marginTop: 30,
		marginBottom: 30,
		resizeMode: 'contain',
	},
	title: {
		fontSize: 36,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#FFFFFF'
	},
	plantInfoContainer: {
		flexDirection: 'row'
	},
	valuesContainer: {
		alignItems: 'flex-start',
	},
	value: {
		fontSize: 18,
		paddingTop: 10,
		color: '#FFFFFF'
	},
	valueName: {
		fontWeight: 'bold'
	},
	statusesContainer: {
		paddingLeft: 20,
	},
	button: {
		backgroundColor: '#638E4E',
		width: WIDTH - 55,
		borderRadius: 22,
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
		overflow: 'hidden',
		padding: 12,
		textAlign:'center',
		marginTop: 30
	}
})

