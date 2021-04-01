import React from "react"
import Particles from "react-tsparticles";


export default function BackgroundAnimation(props) {

    return (
		<div>
			<Particles
				id="tsparticles"
				options={{
					background: {
						color: {
							value: "#141D2B",
						},
					},
					fpsLimit: 60,
					interactivity: {
						detectsOn: "canvas",
						events: {
							onClick: {
							enable: false,
							mode: "push",
						},
						onHover: {
							enable: true,
							mode: "map",
						},
						resize: true,
						},
						modes: {
							bubble: {
							distance: 400,
							duration: 2,
							opacity: 0.8,
							size: 10,
						},
						push: {
							quantity: 4,
						},
						repulse: {
							distance: 200,
							duration: 0.4,
						},
						},
						},
						particles: {
							color: {
								value: "#9FEF00",
							},
						links: {
							color: "#9FEF00",
							distance: 150,
							enable: true,
							opacity: 0.5,
							width: 1,
						},
						collisions: {
							enable: true,
						},
						move: {
							direction: "none",
							enable: true,
							outMode: "bounce",
							random: false,
							speed: 2,
							straight: false,
						},
						number: {
							density: {
							enable: true,
							value_area: 900,
						},
							value: 80,
						},
						opacity: {
							value: 0.5,
						},
						shape: {
							type: "circle",
						},
						size: {
							random: true,
							value: 5,
						},
					},
					detectRetina: true,
				}}
			></Particles>
		</div>
	)
}