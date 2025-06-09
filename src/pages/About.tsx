import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { User, Target, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Maruf Tanvir",
      role: "Research & Technological Planning",
      description: "AI Development | Infrastructure Engineering | Business Strategy",
      linkedin: "https://www.linkedin.com/in/maruftanvir/"
    },
    {
      name: "Abu Yousuf Md. Tasdikujjaman",
      role: "Technological Support",
      description: "Full Stack Web Development | UI/UX Design | Cyber Security",
      linkedin: "https://www.linkedin.com/in/tasdikujjman/"
    },
    {
      name: "Shamiha Thasin",
      role: "Strategy & Communication",
      description: "Strategic Planning | Communication | Team Coordination",
      linkedin: "https://www.linkedin.com/in/shamiha-thasin-a57a742b6/"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">About AquaMorph</h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Pioneering the future of adaptive infrastructure through AI-controlled shape-shifting technology
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-bg-card border-border-color card-hover">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-primary-blue mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-text-secondary">
                  To revolutionize disaster-prone infrastructure with AI-controlled adaptive systems that protect communities and preserve resources through intelligent shape-shifting technology.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bg-card border-border-color card-hover">
              <CardContent className="p-8">
                <Lightbulb className="w-12 h-12 text-secondary-cyan mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-text-secondary">
                  A world where infrastructure adapts intelligently to environmental challenges, preventing disasters before they occur and optimizing resource usage in real-time.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">Team Metamorphosis</h2>
              <p className="text-text-secondary">Meet the experts behind AquaMorph technology</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Maruf Tanvir",
                  role: "Research & Technological Planning",
                  description: "AI Development | Infrastructure Engineering | Business Strategy",
                  linkedin: "https://www.linkedin.com/in/maruftanvir/"
                },
                {
                  name: "Abu Yousuf Md. Tasdikujjaman",
                  role: "Technological Support",
                  description: "Full Stack Web Development | UI/UX Design | Cyber Security",
                  linkedin: "https://www.linkedin.com/in/tasdikujjman/"
                },
                {
                  name: "Shamiha Thasin",
                  role: "Strategy & Communication",
                  description: "Strategic Planning | Communication | Team Coordination",
                  linkedin: "#"
                }
              ].map((member, index) => (
                <Card key={index} className="bg-bg-card/70 border-border-color hover:border-primary-blue/30 hover:shadow-lg hover:shadow-primary-blue/5 transition-all duration-300 h-full group">
                  <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-blue/10 to-secondary-cyan/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                        <User className="w-12 h-12 text-primary-blue" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                      <p className="text-primary-blue font-medium mb-3">{member.role}</p>
                      <p className="text-text-secondary text-sm">{member.description}</p>
                    </div>
                    <div className="mt-6">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center mx-auto px-4 py-2 border border-primary-blue/30 rounded-full text-sm text-primary-blue hover:bg-primary-blue/10 hover:text-white transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        Connect on LinkedIn
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <Award className="w-12 h-12 text-accent-teal mx-auto mb-4" />
              <h2 className="text-3xl font-bold gradient-text mb-4">Our Core Values</h2>
              <p className="text-text-secondary max-w-3xl mx-auto">
                Guiding principles that shape our technology and our commitment to a better future
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Innovation */}
              <Card className="bg-bg-card/50 border-border-color hover:border-primary-blue/30 hover:shadow-lg hover:shadow-primary-blue/10 transition-all duration-300 group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary-blue/10 flex items-center justify-center mb-4 group-hover:bg-primary-blue/20 transition-colors duration-300">
                    <Lightbulb className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                  <p className="text-text-secondary mb-4">Pushing boundaries in AI and materials science to create revolutionary solutions</p>
                  <div className="mt-auto w-12 h-1 bg-gradient-to-r from-primary-blue to-transparent rounded-full"></div>
                </CardContent>
              </Card>

              {/* Sustainability */}
              <Card className="bg-bg-card/50 border-border-color hover:border-secondary-cyan/30 hover:shadow-lg hover:shadow-secondary-cyan/10 transition-all duration-300 group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-secondary-cyan/10 flex items-center justify-center mb-4 group-hover:bg-secondary-cyan/20 transition-colors duration-300">
                    <svg className="w-8 h-8 text-secondary-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h3m-3 4h3m-6-4h.01M7 11h3m4-8a9 9 0 00-7.5 14.196"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Sustainability</h3>
                  <p className="text-text-secondary mb-4">Environmental responsibility at the core of every solution we develop</p>
                  <div className="mt-auto w-12 h-1 bg-gradient-to-r from-secondary-cyan to-transparent rounded-full"></div>
                </CardContent>
              </Card>

              {/* Resilience */}
              <Card className="bg-bg-card/50 border-border-color hover:border-accent-teal/30 hover:shadow-lg hover:shadow-accent-teal/10 transition-all duration-300 group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-accent-teal/10 flex items-center justify-center mb-4 group-hover:bg-accent-teal/20 transition-colors duration-300">
                    <svg className="w-8 h-8 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Resilience</h3>
                  <p className="text-text-secondary mb-4">Building infrastructure that adapts, endures, and protects against environmental challenges</p>
                  <div className="mt-auto w-12 h-1 bg-gradient-to-r from-accent-teal to-transparent rounded-full"></div>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="bg-bg-card/50 border-border-color hover:border-purple-400/30 hover:shadow-lg hover:shadow-purple-400/10 transition-all duration-300 group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-purple-400/10 flex items-center justify-center mb-4 group-hover:bg-purple-400/20 transition-colors duration-300">
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Community</h3>
                  <p className="text-text-secondary mb-4">Dedicated to protecting and empowering communities through innovative solutions</p>
                  <div className="mt-auto w-12 h-1 bg-gradient-to-r from-purple-400 to-transparent rounded-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
