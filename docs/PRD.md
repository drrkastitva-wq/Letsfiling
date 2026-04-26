# Product Requirements Document (MVP)

## Product Name
Letsfiling

## Problem Statement
Small businesses and founders struggle to complete legal and compliance processes quickly because service discovery, document collection, filing status updates, and follow-ups are fragmented.

## Goal
Deliver a mobile-first platform where clients can request CA/CS services, upload documents, track progress, and communicate with assigned experts while the operations team manages leads and filing workflows in one system.

## Target Users
- Founders incorporating a company/LLP
- Existing businesses requiring annual compliance filing
- Internal sales and compliance operations staff
- Partner CAs/CS professionals

## Core Use Cases
1. Client submits a new service request.
2. Client uploads required documents from a checklist.
3. Operations team verifies and assigns the lead.
4. CA/CS expert executes filing and updates stage.
5. Client tracks status and receives reminders for renewals.

## MVP Modules
### 1) Client App
- Mobile OTP login
- Service listing and detail screens
- Guided intake form per service
- Document upload
- Order/filing timeline
- Push notifications

### 2) Admin/Operations Panel (Web or internal tool)
- Lead board: New, Contacted, Qualified, Won, Lost
- Assignment to executive/professional
- Checklist completion tracking
- Status updates and audit logs
- Invoice/payment view

### 3) CRM + Follow-up Engine
- Lead source tracking (app/web/ads/referral)
- Follow-up due reminders
- Basic conversion reports

## Non-Functional Requirements
- Role-based access control
- Audit logs for lead status changes
- Encrypted file storage links
- Secure OTP and token-based sessions
- P95 API response target under 500ms for core read endpoints

## Success Metrics
- Lead-to-order conversion rate
- Average time from lead creation to filing completion
- Document completion rate within 48 hours
- Renewal reminder conversion rate
