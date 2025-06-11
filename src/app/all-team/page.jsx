'use client';

import MainLayout from '../../components/MainLayout';
import LargeTeamDisplay from '../../components/LargeTeamDisplay';
import allTeamMembersData from '../../data/allTeamMember.json';

const AllTeamPage = () => {
  return (
    <MainLayout>
      { }
      <LargeTeamDisplay allMembersData={allTeamMembersData} />
      { }
      <div className="register-card" style={{
        backgroundImage: 'url("/assets/back-regist.png")', 
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height: '200px',
        borderTop: '1px solid white'
      }}>
        <h1>Register Now!</h1>
        <a
          href="https://freshmen.apps.binus.ac.id"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: '15px',
            background: 'none',
            border: '1px solid white',
            padding: '10px 20px',
            borderRadius: '20px',
            textDecoration: 'none',
            color: 'white',
            transition: '0.45s ease'
          }}
        >
          Go to Freshmen Apps
        </a>
      </div>
    </MainLayout>
  );
};

export default AllTeamPage;