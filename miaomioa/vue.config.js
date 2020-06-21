module.exports = {
	devServer: {
		proxy:{
			'/api2': {
				target: 'http://localhost:3000', 
				
				changOrigin: true, 
			},
			'/api': {
				target: 'http://39.97.33.178', 
				
				changOrigin: true, 
			}

		}
	}
}