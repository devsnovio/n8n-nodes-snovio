# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-11-21

Initial release of the official Snov.io integration for n8n workflow automation.

### Added

#### Core Infrastructure (July 2025)
- Project initialization and TypeScript configuration
- n8n node SDK integration and setup
- OAuth 2.0 Client Credentials authentication flow
- Automatic access token exchange and refresh mechanism
- Secure credential storage with expirable tokens
- Base API request handler with automatic field cleanup
- Centralized URL management system
- Error handling with NodeOperationError

#### Email Finder & Data Enrichment (August 2025)
- **Domain Search**: Start and retrieve domain search operations
- **Prospect Profiles**: Batch prospect discovery by domain with full profile data
- **Prospect Emails**: Advanced email search for specific prospects
- **Domain Emails**: Bulk email extraction from company domains
- **Generic Contacts**: Discovery of generic company emails (info@, sales@, support@)
- **Domain Emails Count**: Quick count of available emails per domain
- **Email by Name**: Find emails by combining domain and person name
- **Company Domain Search**: Reverse lookup to find company domain by name
- **LinkedIn Integration**: Extract and enrich data from LinkedIn profile URLs
- **Profile Enrichment**: Get detailed person information from email address
- Implemented task-based async operations with hash tracking
- Added support for filtering by department, position, and other criteria

#### Email Verification (September 2025)
- **Start Verification**: Initiate email address verification process
- **Get Results**: Retrieve verification status and deliverability scores
- Support for single and batch email verification
- Detailed verification results including SMTP check, syntax validation, and catch-all detection

#### Multi-Channel Campaigns (September 2025)
- **Campaign Analytics**: Comprehensive performance metrics and statistics
- **Campaign Progress**: Real-time tracking of campaign execution
- **Recipients Management**: Update and change recipient statuses
- **Completed Prospects**: View prospects who completed campaign sequence
- **Reply Tracking**: Monitor and retrieve campaign replies
- **Open Tracking**: Detailed email open statistics with timestamps
- **Click Tracking**: Track link clicks within campaign emails
- **Sent Emails**: Complete history of sent campaign emails
- **Campaign Listing**: View all user campaigns with filtering
- **Do Not Email List**: Manage email exclusion list for compliance

#### Prospect Management (October 2025)
- **Add to List**: Add prospects with full profile data including custom fields
- **Find by ID**: Retrieve prospect details by unique identifier
- **Find by Email**: Search prospects across lists by email address
- **Custom Fields**: Discover and use custom prospect fields
- **List Management**: Create and organize prospect lists
- **View Lists**: Get all user's prospect lists with metadata
- **List Contents**: Retrieve all prospects from specific list with pagination
- Support for social links (LinkedIn, Facebook, X/Twitter)
- Phone numbers and location data management
- Company information tracking

#### User Account (October 2025)
- **Balance Check**: Monitor API credit balance and usage

### Enhanced Features (November 2025)

#### Developer Experience
- Comprehensive field validation with helpful hints
- Contextual placeholder text for all inputs
- Dynamic operation display based on resource selection
- Support for n8n AI agents (`usableAsTool: true`)
- Proper TypeScript types throughout the codebase
- Consistent error messages and handling

#### UI/UX Improvements
- Organized operations into 5 logical resource categories
- Clear operation naming following Snov.io API conventions
- HTML links in hints for external documentation
- Multi-value field support for arrays (social links, custom fields)
- Boolean toggles for update operations
- Collection fields for complex nested data

#### Performance & Quality
- Efficient request handling with automatic cleanup of empty fields
- Proper async/await patterns throughout
- Clean separation of concerns (transport, operations, routing)
- Reusable components for common operation patterns
- Optimized imports and bundle size

### Documentation (November 2025)
- Comprehensive README with installation and setup instructions
- Detailed operation descriptions for all 33+ endpoints
- Usage examples for common workflows
- API credential setup guide with screenshots reference
- Support and contribution guidelines
- MIT license with proper attribution

### Testing & Quality Assurance (November 2025)
- Code linting with n8n-specific rules
- TypeScript strict mode compliance
- Build verification and type checking
- Manual testing of all operations
- Credential flow validation
- Error handling verification

### Technical Details

**Supported Snov.io API Versions:**
- v1 endpoints: 11 operations
- v2 endpoints: 22 operations

**n8n Compatibility:**
- n8n API version: 1
- Minimum n8n version: 0.227.0
- Node.js version: 20+

**Architecture:**
- Modular operation structure with dedicated files per operation
- Router-based request dispatching
- Centralized API transport layer
- Consistent description + execute pattern across all operations

### Known Limitations
- Some operations use task-based async flow requiring polling
- Rate limits depend on Snov.io account plan
- Certain fields are plan-dependent (LinkedIn data, advanced filters)

### Migration Notes
This is the initial release. No migration needed.

---

**Development Timeline:**
- July 2025: Project initialization and core infrastructure
- August 2025: Email Finder & Data Enrichment implementation
- September 2025: Email Verifier and Multi-Channel Campaigns
- October 2025: Prospect Management and User Account operations
- November 2025: Testing, documentation, and release preparation

**Contributors:**
- Snov.io Development Team

**Release Date:** November 21, 2025

[0.0.1]: https://github.com/devsnovio/n8n-nodes-snovio/releases/tag/v0.0.1
