<!-- src/routes/+page.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { ArrowRight, CheckCircle, Users, Award, Globe, Zap } from 'lucide-svelte';
	
	import Hero from '$lib/components/Hero.svelte';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import StatsSection from '$lib/components/StatsSection.svelte';
	import TestimonialSection from '$lib/components/TestimonialSection.svelte';

	const services = [
		{
			title: 'services.highway_engineering.title',
			description: 'services.highway_engineering.description',
			href: '/highway-engineering',
			icon: '🛣️',
			features: ['Car Park Design', 'Traffic Management', 'Junction Design', 'Sustainable Solutions']
		},
		{
			title: 'services.traffic_engineering.title',
			description: 'services.traffic_engineering.description', 
			href: '/traffic-engineering',
			icon: '🚦',
			features: ['Traffic Modeling', 'Impact Assessment', 'ITS Solutions', 'Safety Engineering']
		},
		{
			title: 'services.transport_planning.title',
			description: 'services.transport_planning.description',
			href: '/transport-planning', 
			icon: '🗺️',
			features: ['Feasibility Studies', 'Master Planning', 'Site Access', 'Travel Plans']
		}
	];

	const stats = [
		{ value: '500+', label: 'Projects Completed' },
		{ value: '15+', label: 'Years Experience' },
		{ value: '98%', label: 'Client Satisfaction' },
		{ value: '50+', label: 'Team Members' }
	];

	const features = [
		{
			icon: Users,
			title: 'Expert Team',
			description: 'Highly qualified engineers and planners with extensive industry experience.'
		},
		{
			icon: Award,
			title: 'Award Winning',
			description: 'Recognized for excellence in transport engineering and innovative solutions.'
		},
		{
			icon: Globe,
			title: 'Global Reach',
			description: 'International projects across diverse markets and regulatory environments.'
		},
		{
			icon: Zap,
			title: 'Innovation First',
			description: 'Cutting-edge technology and methodologies for superior project outcomes.'
		}
	];
</script>

<svelte:head>
	<title>Transport Engineering Consultancy - Leading Highway & Traffic Solutions</title>
	<meta name="description" content="Leading transport and highway engineering consultancy delivering innovative solutions for sustainable infrastructure development. Expert traffic planning and highway design services." />
</svelte:head>

<!-- Hero Section -->
<Hero />

<!-- Services Overview -->
<section class="py-24 bg-slate-50 dark:bg-slate-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				Our Core Services
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				Comprehensive transport engineering solutions designed to meet the challenges of modern infrastructure development.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each services as service}
				<ServiceCard {service} />
			{/each}
		</div>
	</div>
</section>

<!-- Stats Section -->
<StatsSection {stats} />

<!-- Features Section -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
				Why Choose Us
			</h2>
			<p class="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
				We combine technical expertise with innovative approaches to deliver exceptional results for every project.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each features as feature}
				<div class="text-center group">
					<div class="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
						<svelte:component this={feature.icon} class="w-8 h-8 text-primary-600 dark:text-primary-400" />
					</div>
					<h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
						{feature.title}
					</h3>
					<p class="text-slate-600 dark:text-slate-300">
						{feature.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Testimonials -->
<TestimonialSection />

<!-- CTA Section -->
<section class="py-24 bg-gradient-to-r from-primary-600 to-emerald-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl lg:text-4xl font-bold text-white mb-4">
			Ready to Start Your Project?
		</h2>
		<p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
			Let our expert team help you create innovative transport solutions that drive success.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<a 
				href="/contact" 
				class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors group"
			>
				Get Started Today
				<ArrowRight class="ml-2 rtl:mr-2 rtl:ml-0 w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
			</a>
			<a 
				href="/services" 
				class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors"
			>
				Explore Services
			</a>
		</div>
	</div>
</section>