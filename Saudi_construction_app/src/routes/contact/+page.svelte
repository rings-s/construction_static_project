<!-- src/routes/contact/+page.svelte -->
<script>
	import { _ } from 'svelte-i18n';
	import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-svelte';
	
	let formData = {
		name: '',
		email: '',
		phone: '',
		subject: '',
		message: ''
	};
	
	let isSubmitting = false;
	let isSubmitted = false;
	let errors = {};

	function validateForm() {
		errors = {};
		
		if (!formData.name.trim()) {
			errors.name = 'Name is required';
		}
		
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			errors.email = 'Please enter a valid email address';
		}
		
		if (!formData.subject.trim()) {
			errors.subject = 'Subject is required';
		}
		
		if (!formData.message.trim()) {
			errors.message = 'Message is required';
		}
		
		return Object.keys(errors).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		
		if (!validateForm()) {
			return;
		}
		
		isSubmitting = true;
		
		try {
			// Simulate form submission (replace with actual form handling)
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// Reset form and show success message
			formData = { name: '', email: '', phone: '', subject: '', message: '' };
			isSubmitted = true;
			
			// Hide success message after 5 seconds
			setTimeout(() => {
				isSubmitted = false;
			}, 5000);
			
		} catch (error) {
			console.error('Form submission error:', error);
		} finally {
			isSubmitting = false;
		}
	}

	const contactInfo = [
		{
			icon: MapPin,
			title: 'Our Office',
			content: $_('contact.info.address'),
			href: 'https://maps.google.com'
		},
		{
			icon: Phone,
			title: 'Phone',
			content: $_('contact.info.phone'),
			href: 'tel:+15551234567'
		},
		{
			icon: Mail,
			title: 'Email',
			content: $_('contact.info.email'),
			href: 'mailto:info@transportconsulting.com'
		},
		{
			icon: Clock,
			title: 'Office Hours',
			content: $_('contact.info.hours'),
			href: null
		}
	];
</script>

<svelte:head>
	<title>Contact Us - Transport Engineering Consultancy</title>
	<meta name="description" content="Get in touch with our expert transport engineering team. Contact us for consultations, project inquiries, and professional transport planning services." />
</svelte:head>

<!-- Hero Section -->
<section class="pt-32 pb-16 bg-gradient-to-r from-emerald-900 to-slate-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="text-4xl lg:text-5xl font-bold text-white mb-6">
				{$_('contact.title')}
			</h1>
			<p class="text-xl text-slate-300 max-w-3xl mx-auto">
				{$_('contact.subtitle')}
			</p>
		</div>
	</div>
</section>

<!-- Contact Form & Info -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid lg:grid-cols-2 gap-16">
			<!-- Contact Form -->
			<div>
				<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
					<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">
						Send us a Message
					</h2>
					
					{#if isSubmitted}
						<div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg p-4 mb-6">
							<div class="flex items-center">
								<CheckCircle class="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3 rtl:ml-3 rtl:mr-0" />
								<div class="text-emerald-800 dark:text-emerald-300 font-medium">
									Thank you for your message! We'll get back to you soon.
								</div>
							</div>
						</div>
					{/if}

					<form on:submit={handleSubmit} class="space-y-6">
						<!-- Name -->
						<div>
							<label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								{$_('contact.form.name')} *
							</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								class={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
									errors.name 
										? 'border-red-300 dark:border-red-600' 
										: 'border-slate-300 dark:border-slate-600'
								} bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
								placeholder="Your full name"
							/>
							{#if errors.name}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
							{/if}
						</div>

						<!-- Email -->
						<div>
							<label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								{$_('contact.form.email')} *
							</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								class={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
									errors.email 
										? 'border-red-300 dark:border-red-600' 
										: 'border-slate-300 dark:border-slate-600'
								} bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
								placeholder="your.email@example.com"
							/>
							{#if errors.email}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
							{/if}
						</div>

						<!-- Phone -->
						<div>
							<label for="phone" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								{$_('contact.form.phone')}
							</label>
							<input
								type="tel"
								id="phone"
								bind:value={formData.phone}
								class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
								placeholder="+1 (555) 123-4567"
							/>
						</div>

						<!-- Subject -->
						<div>
							<label for="subject" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								{$_('contact.form.subject')} *
							</label>
							<input
								type="text"
								id="subject"
								bind:value={formData.subject}
								class={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
									errors.subject 
										? 'border-red-300 dark:border-red-600' 
										: 'border-slate-300 dark:border-slate-600'
								} bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
								placeholder="How can we help you?"
							/>
							{#if errors.subject}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
							{/if}
						</div>

						<!-- Message -->
						<div>
							<label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
								{$_('contact.form.message')} *
							</label>
							<textarea
								id="message"
								rows="5"
								bind:value={formData.message}
								class={`w-full px-4 py-3 rounded-lg border transition-colors focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
									errors.message 
										? 'border-red-300 dark:border-red-600' 
										: 'border-slate-300 dark:border-slate-600'
								} bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
								placeholder="Tell us about your project requirements..."
							></textarea>
							{#if errors.message}
								<p class="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
							{/if}
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center"
						>
							{#if isSubmitting}
								<div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 rtl:ml-2 rtl:mr-0"></div>
								Sending...
							{:else}
								<Send class="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
								{$_('contact.form.submit')}
							{/if}
						</button>
					</form>
				</div>
			</div>

			<!-- Contact Information -->
			<div>
				<div class="mb-8">
					<h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
						Get in Touch
					</h2>
					<p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
						Ready to start your transport engineering project? Our expert team is here to help you create innovative, sustainable solutions tailored to your specific needs.
					</p>
				</div>

				<!-- Contact Info Cards -->
				<div class="grid gap-6">
					{#each contactInfo as info}
						<div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
							<div class="flex items-start">
								<div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0 flex-shrink-0">
									<svelte:component this={info.icon} class="w-6 h-6 text-primary-600 dark:text-primary-400" />
								</div>
								<div>
									<h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-1">
										{info.title}
									</h3>
									{#if info.href}
										<a href={info.href} class="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
											{info.content}
										</a>
									{:else}
										<div class="text-slate-600 dark:text-slate-300">
											{info.content}
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Map Placeholder -->
				<div class="mt-8 bg-slate-200 dark:bg-slate-700 rounded-xl h-64 flex items-center justify-center">
					<div class="text-center">
						<MapPin class="w-12 h-12 text-slate-400 mx-auto mb-2" />
						<div class="text-slate-600 dark:text-slate-400">Interactive Map</div>
						<div class="text-sm text-slate-500 dark:text-slate-500">123 Engineering Boulevard, Tech City</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>