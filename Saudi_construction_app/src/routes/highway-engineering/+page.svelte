<!-- src/routes/highway-engineering/+page.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, MapPin, Clock, Users } from 'lucide-svelte';

	const services = [
		{
			title: 'nav.car_park_design',
			description: 'services.highway_engineering.car_park_design.description',
			href: '/highway-engineering/car-park-design',
			features: ['Optimal space utilization', 'Traffic flow optimization', 'Accessibility compliance', 'Sustainable design principles']
		},
		{
			title: 'nav.traffic_management_plans',
			description: 'services.highway_engineering.traffic_management_plans.description',
			href: '/highway-engineering/traffic-management-plans',
			features: ['Comprehensive safety protocols', 'Minimized disruption', 'Regulatory compliance', 'Real-time monitoring']
		},
		{
			title: 'nav.highway_junction_design',
			description: 'services.highway_engineering.highway_junction_design.description',
			href: '/highway-engineering/highway-junction-design',
			features: ['Advanced geometric design', 'Safety optimization', 'Capacity enhancement', 'Future-ready solutions']
		},
		{
			title: 'nav.sustainable_transport',
			description: 'services.highway_engineering.sustainable_transport.description',
			href: '/highway-engineering/sustainable-transport',
			features: ['Environmental impact reduction', 'Green infrastructure', 'Energy-efficient solutions', 'Climate resilience']
		}
	];

	const projects = [
		{
			title: "Metropolitan Highway Interchange",
			location: "City Center, Tech Valley",
			duration: "18 months",
			team: "12 specialists",
			description: "Complete redesign of major highway interchange improving traffic flow by 40% while reducing environmental impact.",
			image: "/images/projects/highway-interchange.jpg"
		},
		{
			title: "Sustainable Car Park Complex",
			location: "Downtown Commercial District", 
			duration: "8 months",
			team: "6 specialists",
			description: "Multi-level car park design incorporating green technologies and electric vehicle charging infrastructure.",
			image: "/images/projects/car-park.jpg"
		},
		{
			title: "Smart Traffic Management System",
			location: "Urban Corridor Network",
			duration: "12 months", 
			team: "8 specialists",
			description: "Implementation of intelligent traffic management across 15km of urban highways reducing congestion by 35%.",
			image: "/images/projects/traffic-management.jpg"
		}
	];
</script>

<svelte:head>
	<title>Highway Engineering Services - Expert Infrastructure Solutions</title>
	<meta name="description" content="Professional highway engineering services including car park design, traffic management plans, junction design, and sustainable transport solutions. Expert consultation and implementation." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 bg-gradient-to-r from-primary-900 to-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div class="inline-flex items-center px-4 py-2 bg-primary-500/20 backdrop-blur-sm rounded-full border border-primary-500/30 text-primary-300 text-sm font-medium mb-8">
				🛣️ Highway Engineering Excellence
			</div>
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
				{$_('services.highway_engineering.title')}
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto">
				{$_('services.highway_engineering.description')}
			</p>
		</div>
	</div>
</section>

<!-- Services Grid -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				Our Highway Engineering Services
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				Comprehensive solutions designed to meet the evolving needs of modern highway infrastructure.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each services as service}
				<div class="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700">
					<div class="p-8">
						<h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
							{$_(service.title)}
						</h3>
						<p class="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
							{$_(service.description)}
						</p>
						
						<ul class="space-y-3 mb-8">
							{#each service.features as feature}
								<li class="flex items-center text-sm text-slate-600 dark:text-slate-300">
									<CheckCircle class="w-4 h-4 text-emerald-500 mr-3 rtl:ml-3 rtl:mr-0 flex-shrink-0" />
									{feature}
								</li>
							{/each}
						</ul>
						
						<a 
							href={service.href} 
							class="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors group"
						>
							Learn More
							<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-4 h-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Featured Projects -->
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				Featured Highway Projects
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				Showcasing our expertise through successful highway engineering implementations.
			</p>
		</div>

		<div class="grid lg:grid-cols-3 gap-8">
			{#each projects as project}
				<div class="bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
					<div class="aspect-w-16 aspect-h-9 bg-slate-200 dark:bg-slate-700">
						<div class="w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
							<span class="text-4xl">🛣️</span>
						</div>
					</div>
					<div class="p-6">
						<h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
						<p class="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{project.description}</p>
						
						<div class="grid grid-cols-3 gap-4 text-center">
							<div>
								<MapPin class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">Location</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{project.location}</div>
							</div>
							<div>
								<Clock class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">Duration</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{project.duration}</div>
							</div>
							<div>
								<Users class="w-4 h-4 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
								<div class="text-xs text-slate-500 dark:text-slate-400">Team</div>
								<div class="text-xs font-medium text-slate-700 dark:text-slate-300">{project.team}</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24 bg-gradient-to-r from-primary-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
			Ready to Discuss Your Highway Project?
		</h2>
		<p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
			Our highway engineering experts are ready to help you create innovative, sustainable infrastructure solutions.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors group"
			>
				Start Your Project
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/about" 
				class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
			>
				Learn About Our Team
			</a>
		</div>
	</div>
</section>