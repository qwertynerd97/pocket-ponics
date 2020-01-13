import React from 'react';
import { Text, View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';

import GreenhouseDisplay from './display'
import GreenhouseStatsDisplay from './stats'
import GreenhouseHistoryDisplay from './history'

class GreenhouseSwipeable extends React.Component {
	constructor(props) {
		super(props)

		this.swipeable = React.createRef();
	}

	getStats() {
		return {
			battery: this.props.greenhouse.battery,
			water: this.props.greenhouse.water_level,
			nutrient: this.props.greenhouse.nutrient_level
		}
	}

	render() {
		const { width } = Dimensions.get('window');
		return (
			<ScrollView style={{ width, backgroundColor: '#472600' }}>
				<View style={{ height: 600 }}>
					<GreenhouseDisplay 
						navigation={this.props.navigation} 
						tiers={this.props.greenhouse.tiers} 
						seedlings={this.props.greenhouse.seedling_time}
						displaySeedlings={this.props.greenhouse.seedling_time}/>
				</View>
				<GreenhouseStatsDisplay stats={this.getStats() || {}} navigation={this.props.navigation} />
				<GreenhouseHistoryDisplay navigation={this.props.navigation} />
			</ScrollView>
		)
	}	
}

export default GreenhouseSwipeable