from enum import Enum


class OrderRequestState(Enum):
    REJECTED = "rejected"
    ACCEPTED = "accepted"
    PENDING = "pending"
