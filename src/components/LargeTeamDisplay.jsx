// src/components/LargeTeamDisplay.jsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import TeamMemberCard from './MemberCard';
import allTeamMembersData from '../data/allTeamMember.json';

const ITEMS_PER_PAGE = 48;

const getUniqueCategories = (data, categoryKey) => {
  const categories = new Set();
  data.forEach(item => {
    if (item[categoryKey]) {
      categories.add(item[categoryKey]);
    }
  });
  return ['All', ...Array.from(categories).sort()];
};

const LargeTeamDisplay = ({ allMembersData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRoleFilter, setActiveRoleFilter] = useState('All');
  const [activeSchoolFilter, setActiveSchoolFilter] = useState('All');
  const [activeProgramFilter, setActiveProgramFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueRoles = useMemo(() => getUniqueCategories(allMembersData, 'role'), [allMembersData]);
  const uniqueSchools = useMemo(() => getUniqueCategories(allMembersData, 'school'), [allMembersData]);
  const uniquePrograms = useMemo(() => getUniqueCategories(allMembersData, 'program'), [allMembersData]);

  const filteredMembers = useMemo(() => {
    let tempMembers = allMembersData;

    if (activeRoleFilter !== 'All') {
      tempMembers = tempMembers.filter(member => member.role === activeRoleFilter);
    }

    if (activeSchoolFilter !== 'All') {
      tempMembers = tempMembers.filter(member => member.school === activeSchoolFilter);
    }

    if (activeProgramFilter !== 'All') {
      tempMembers = tempMembers.filter(member => member.program === activeProgramFilter);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      tempMembers = tempMembers.filter(member =>
        member.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.program.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.school.toLowerCase().includes(lowerCaseSearchTerm) ||
        member.role.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    return tempMembers;
  }, [allMembersData, searchTerm, activeRoleFilter, activeSchoolFilter, activeProgramFilter]);

  const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredMembers.slice(startIndex, endIndex);
  }, [currentPage, filteredMembers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeRoleFilter, activeSchoolFilter, activeProgramFilter]);

  const handlePageChange = (page) => {
    // Ensure page doesn't go below 1 or above totalPages
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleFilterChange = (e) => {
    setActiveRoleFilter(e.target.value);
  };

  const handleSchoolFilterChange = (e) => {
    setActiveSchoolFilter(e.target.value);
    setActiveProgramFilter('All');
  };

  const handleProgramFilterChange = (e) => {
    setActiveProgramFilter(e.target.value);
  };

  return (
    <div className="large-team-display-container" style={{
      backgroundColor: '#59282b',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div className="controls-header" style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: 'rgba(89, 40, 43, 0.7)',
        color: 'white',
        borderBottom: '1px solid white',
        // REMOVED STICKY STYLES:
        // position: 'sticky',
        // top: '0',
        // zIndex: '100'
      }}>
        <h1>Our Team ({filteredMembers.length} Members Found)</h1>
        <p>Search, filter, and discover our amazing team members.</p>

        <div className="filters-and-search" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '30px'
        }}>
          <input
            type="text"
            placeholder="Search by name, program, school, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '300px' }}
          />

          <select
            value={activeRoleFilter}
            onChange={handleRoleFilterChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}
          >
            {uniqueRoles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={activeSchoolFilter}
            onChange={handleSchoolFilterChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}
          >
            {uniqueSchools.map(school => (
              <option key={school} value={school}>{school}</option>
            ))}
          </select>

          <select
            value={activeProgramFilter}
            onChange={handleProgramFilterChange}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white' }}
          >
            {getUniqueCategories(
                activeSchoolFilter === 'All'
                    ? allMembersData
                    : allMembersData.filter(m => m.school === activeSchoolFilter),
                'program'
            ).map(program => (
                <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="member-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '30px',
        padding: '50px',
        color: 'white',
        flexGrow: '1'
      }}>
        {paginatedMembers.length > 0 ? (
          paginatedMembers.map((member) => (
            <TeamMemberCard
              key={member.id}
              id={member.id}
              name={member.name}
              program={member.program}
              school={member.school}
              role={member.role}
              image={member.image}
              disableConfetti={true}
            />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '1.2rem' }}>
            No team members found matching your criteria.
          </p>
        )}
      </div>

      {totalPages > 1 && ( // Only show pagination if there's more than one page
        <div className="pagination-controls" style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          padding: '30px',
          backgroundColor: '#59282b',
          borderTop: '1px solid white'
        }}>
          {/* Previous Page Button - Hidden if on first page */}
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              style={{
                padding: '8px 15px', borderRadius: '5px', border: '1px solid #ccc',
                backgroundColor: '#fff', color: '#59282b', cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease, color 0.3s ease'
              }}
            >
              Previous
            </button>
          )}

          {/* Page Numbers */}
          {/* Refined page number rendering to show a sensible range */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
            const maxPageNumbersToShow = 7;
            const ellipsisThreshold = 2;

            if (
              totalPages <= maxPageNumbersToShow ||
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - ellipsisThreshold && pageNumber <= currentPage + ellipsisThreshold)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    backgroundColor: currentPage === pageNumber ? '#cd7c8b' : '#fff',
                    color: currentPage === pageNumber ? 'white' : '#59282b',
                    cursor: 'pointer',
                    fontWeight: currentPage === pageNumber ? 'bold' : 'normal',
                    transition: 'background-color 0.3s ease, color 0.3s ease'
                  }}
                >
                  {pageNumber}
                </button>
              );
            } else if (
              (pageNumber === currentPage - ellipsisThreshold - 1 && pageNumber > 1) ||
              (pageNumber === currentPage + ellipsisThreshold + 1 && pageNumber < totalPages)
            ) {
              return <span key={`ellipsis-${pageNumber}`} style={{color: 'white', padding: '0 5px'}}>...</span>;
            }
            return null;
          })}


          {/* Next Page Button - Hidden if on last page */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              style={{
                padding: '8px 15px', borderRadius: '5px', border: '1px solid #ccc',
                backgroundColor: '#fff', color: '#59282b', cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease, color 0.3s ease'
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
      {totalPages <= 1 && <div style={{ height: '30px', backgroundColor: '#59282b', borderTop: '1px solid white' }}></div>}
    </div>
  );
};

export default LargeTeamDisplay;