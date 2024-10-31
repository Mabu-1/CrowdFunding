// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrowdFunding {
    enum CampaignCategory {
        MEDICAL_TREATMENT,
        DISASTER_RELIEF,
        EDUCATION,
        STARTUP_BUSINESS,
        CREATIVE_PROJECTS,
        COMMUNITY_SERVICE,
        TECHNOLOGY,
        ENVIRONMENTAL
    }

    struct Campaign {
        address owner;
        string metadataHash;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        bool claimed;
        bool isActive;
        CampaignCategory category;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    // Events
    event CampaignCreated(
        uint256 id,
        address indexed owner,
        string metadataHash,
        uint256 target,
        uint256 deadline,
        CampaignCategory category
    );
    event CampaignUpdated(
        uint256 id,
        string newMetadataHash,
        uint256 newTarget,
        uint256 newDeadline
    );
    event CampaignDeleted(uint256 id);
    event DonationReceived(
        uint256 campaignId,
        address indexed donor,
        uint256 amount
    );
    event CampaignClaimed(
        uint256 campaignId,
        address indexed owner,
        uint256 amountCollected
    );

    // Create a new campaign
    function createCampaign(
        string memory _metadataHash,
        uint256 _target,
        uint256 _deadline,
        CampaignCategory _category
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_target > 0, "Target amount must be greater than 0");

        campaigns[campaignCount] = Campaign({
            owner: msg.sender,
            metadataHash: _metadataHash,
            target: _target,
            deadline: _deadline,
            amountCollected: 0,
            claimed: false,
            isActive: true,
            category: _category
        });

        emit CampaignCreated(
            campaignCount,
            msg.sender,
            _metadataHash,
            _target,
            _deadline,
            _category
        );

        campaignCount++;
        return campaignCount - 1;
    }

    // Update campaign metadata and other details
    function updateCampaign(
        address owner1,
        uint256 _id,
        string memory _newMetadataHash,
        uint256 _newTarget,
        uint256 _newDeadline
    ) public {
        require(_id < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_id];
        require(owner1 == campaign.owner, "Only owner can update the campaign");
        require(campaign.isActive, "Cannot update an inactive campaign");
        require(_newDeadline > block.timestamp, "New deadline must be in the future");
        require(_newTarget > 0, "Target amount must be greater than 0");

        // Update campaign fields
        campaign.metadataHash = _newMetadataHash;
        campaign.target = _newTarget;
        campaign.deadline = _newDeadline;

        emit CampaignUpdated(_id, _newMetadataHash, _newTarget, _newDeadline);
    }

    // Soft delete a campaign
    function deleteCampaign(uint256 _id, address owner2) public {
        require(_id < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_id];
        require(owner2 == campaign.owner, "Only owner can delete the campaign");
        require(campaign.isActive, "Campaign is already inactive");

        campaign.isActive = false;
        emit CampaignDeleted(_id);
    }

    // Donate to a campaign
    function donateToCampaign(uint256 _id) public payable {
        require(_id < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_id];
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Donation must be greater than 0");

        campaign.amountCollected += msg.value;
        emit DonationReceived(_id, msg.sender, msg.value);
    }

    // Claim funds after campaign ends
    function claimFunds(uint256 _id) public {
        require(_id < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_id];
        require(msg.sender == campaign.owner, "Only owner can claim funds");
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp > campaign.deadline, "Campaign has not ended yet");
        require(!campaign.claimed, "Funds already claimed");
        require(campaign.amountCollected > 0, "No funds to claim");

        uint256 amount = campaign.amountCollected;
        campaign.claimed = true;

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");
        require(sent, "Failed to send funds");

        emit CampaignClaimed(_id, campaign.owner, amount);
    }

    // Get details of a single campaign
    function getCampaignDetails(uint256 _id) public view returns (
        address owner,
        string memory metadataHash,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        bool claimed,
        bool isActive,
        CampaignCategory category
    ) {
        require(_id < campaignCount, "Invalid campaign ID");
        Campaign storage campaign = campaigns[_id];
        return (
            campaign.owner,
            campaign.metadataHash,
            campaign.target,
            campaign.deadline,
            campaign.amountCollected,
            campaign.claimed,
            campaign.isActive,
            campaign.category
        );
    }

    // Get all active campaigns
    function getActiveCampaigns() public view returns (Campaign[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].isActive) {
                activeCount++;
            }
        }

        Campaign[] memory activeCampaigns = new Campaign[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].isActive) {
                activeCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return activeCampaigns;
    }

    // Get campaigns by category
    function getCampaignsByCategory(CampaignCategory _category) public view returns (Campaign[] memory) {
        uint256 categoryCount = 0;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].isActive && campaigns[i].category == _category) {
                categoryCount++;
            }
        }

        Campaign[] memory categoryCampaigns = new Campaign[](categoryCount);
        uint256 index = 0;

        for (uint256 i = 0; i < campaignCount; i++) {
            if (campaigns[i].isActive && campaigns[i].category == _category) {
                categoryCampaigns[index] = campaigns[i];
                index++;
            }
        }

        return categoryCampaigns;
    }
}
