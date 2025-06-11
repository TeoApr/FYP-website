// src/app/fypl/page.jsx
'use client'; // This page uses hooks like useState and imports client components

import MainLayout from '../../components/MainLayout'; // Import the custom layout
import SchoolCarousel from '../../components/schoolCarousel'; // Import the SchoolCarousel component
import teamMembersData from '../../data/teamMembers.json'; // Import your JSON data for 15 members

// Helper function to group members by school
// This is done client-side for now, but in a real app, this might be done server-side
// or at build time for better performance with large datasets.
const groupMembersBySchool = (members) => {
  const schools = {};
  members.forEach(member => {
    // Ensure schoolSlug exists. If not, create one from school name.
    const schoolSlug = member.schoolSlug || member.school.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

    if (!schools[schoolSlug]) {
      schools[schoolSlug] = {
        school: member.school,
        schoolSlug: schoolSlug, // Ensure slug is part of the school object
        schoolTagline: member.schoolTagline, // Tagline might be missing if not in data
        members: []
      };
    }
    schools[schoolSlug].members.push(member);
  });
  return Object.values(schools); // Returns an array of school objects
};

// Group the imported data immediately
const schoolsData = groupMembersBySchool(teamMembersData);

const FyplPage = () => {
  return (
    <MainLayout> {/* Wrap the content with MainLayout for Navbar/Footer */}
      {/* Main card/hero section for FYPL page */}
      <div className="main-card-fypl"></div>

      {/* Render a SchoolCarousel for each grouped school */}
      {schoolsData.map((school) => (
        <SchoolCarousel
          key={school.schoolSlug} // Unique key for React list rendering
          school={school.school}
          schoolTagline={school.schoolTagline}
          members={school.members} // Pass the members belonging to this school (including image)
        />
      ))}

      {/* Register card section */}
      <div className="register-card">
        <h1>Register Now!</h1>
        <a href="https://freshmen.apps.binus.ac.id" target="_blank" rel="noopener noreferrer">Go to Freshmen Apps</a>
      </div>
    </MainLayout>
  );
};

export default FyplPage;