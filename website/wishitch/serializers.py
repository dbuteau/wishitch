from rest_framework import serializers
from wishitch.models import Wishlist

class WishlistSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Wishlist
        fields = ('id', 'name', 'price', 'link', 'img_link', 'reserved', 'added_at')
        read_only_fields = ('added_at',)