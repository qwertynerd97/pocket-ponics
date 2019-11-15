import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

import styles from './display-styles'

const tierImage = require('../../assets/tier.png')
const toptierImage = require('../../assets/top-tier.png')
const tomatoImage = require('../../assets/tomato.png')
const greenbeanImage = require('../../assets/greenbean.png')
const spinachImage = require('../../assets/spinach.png')
const turnipImage = require('../../assets/turnip.png')
const seedlingImage = require('../../assets/seedling.png')

const onPress = event => {
	console.log(event)
}

const displayTopTier = (type) => {
	switch(type) {
		case 'tomato': 
			return (
				<Image source={tomatoImage} style={styles.topImage}/>
			)
	}
}

const displayTier = (type) => {
	let imageSrc
	switch(type) {
		case 'greenbeans': 
			imageSrc = greenbeanImage
			break
		case 'spinach': 
			imageSrc = spinachImage
			break
		case 'turnip': 
			imageSrc = turnipImage
			break
	}

	return (
		<ImageBackground source={tierImage} style={styles.tier}>
			<Image source={imageSrc} style={styles.image}/>
			<Image source={imageSrc} style={styles.image}/>
			<Image source={imageSrc} style={styles.image}/>
		</ImageBackground>
	)
}

const GreenhouseDisplay = props => {
	const { navigate } = props.navigation
	console.log(props.tiers)

	return (
		<View style={styles.background}>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: props.tiers[0] })}>
				<ImageBackground source={toptierImage} style={styles.toptier}>
					{displayTopTier(props.tiers[0].name)}
				</ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: props.tiers[1] })}>
				{displayTier(props.tiers[1].name)}
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: props.tiers[2] })}>
				{displayTier(props.tiers[2].name)}
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigate('Tier', { plant: props.tiers[3] })}>
				{displayTier(props.tiers[3].name)}
			</TouchableOpacity>
			<TouchableOpacity>
				<ImageBackground source={tierImage} style={styles.tier}>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
					<Image source={seedlingImage} style={styles.seedling}/>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	)
}

export default GreenhouseDisplay