# ZENITH — AI Privacy Firewall

> **Give AI the answer it needs, not the data you have.**

ZENITH is an **AI Privacy Firewall** that acts as a security and privacy middleware between organizations and external AI/LLM systems.

Instead of blindly sending an application's complete context to an AI model, ZENITH first determines:

- What the user is trying to accomplish
- What sensitive information is present
- Which information is actually necessary for the task
- What information can be safely transformed
- What information must never reach the AI
- Whether the AI's response contains sensitive information that should be blocked

The result is a **task-aware privacy layer** that minimizes unnecessary data exposure while preserving the information required for the AI task.

---

## Table of Contents

- [Problem](#problem)
- [Why Existing Approaches Are Not Enough](#why-existing-approaches-are-not-enough)
- [Our Solution](#our-solution)
- [Core Principle](#core-principle)
- [Key Innovation](#key-innovation)
- [How ZENITH Works](#how-zenith-works)
- [Architecture](#architecture)
- [Complete Request Flow](#complete-request-flow)
- [Security Decision Model](#security-decision-model)
- [Transformation Actions](#transformation-actions)
- [AI's Role](#ais-role)
- [Deterministic Security Enforcement](#deterministic-security-enforcement)
- [Input Privacy Protection](#input-privacy-protection)
- [Output Privacy Protection](#output-privacy-protection)
- [Audit Trail](#audit-trail)
- [Dashboard](#dashboard)
- [Demo Scenario](#demo-scenario)
- [Attack / Security Scenarios](#attack--security-scenarios)
- [Example Workflow](#example-workflow)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [API](#api)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Security Design](#security-design)
- [Privacy vs Utility](#privacy-vs-utility)
- [Current MVP](#current-mvp)
- [Limitations](#limitations)
- [Future Scope](#future-scope)
- [Team](#team)
- [Why ZENITH](#why-zenith)

---

# Problem

Organizations increasingly use external AI models for:

- Customer support
- Financial analysis
- Document processing
- Internal reporting
- Business intelligence
- Decision support
- Workflow automation

However, these applications often have access to much more information than the AI model actually needs.

For example, consider a banking organization that has the following customer information:

```text
Name: Rahul Sharma
Date of Birth: 14-07-1998
PAN: ABCDE1234F
Email: rahul@gmail.com
Phone: 9876543210
Annual Income: ₹12,00,000
Account Balance: ₹4,80,000
City: Hyderabad
