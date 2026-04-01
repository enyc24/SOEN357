import React, { useState, useRef } from "react";
import Layout from '../components/Layout';

const TAGS = ["Must try", "Authentic", "Hidden gem", "Late night", "Fine Dining", "Casual"];

const RESTAURANTS = [
    "Biru Biru",
    "Schwartz's Deli",
    "Joe Beef",
    "Maison Publique",
    "Milos",
    "L'Express",
    "Au Pied de Cochon",
    "Toque!",
    "Tomate Basilic",
    "Lemoine Buffet",
];

export default function AddReviewPage() {
    const [restaurant, setRestaurant] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [rating, setRating] = useState(4);
    const [hoverRating, setHoverRating] = useState(0);
    const [order, setOrder] = useState("");
    const [review, setReview] = useState("");
    const [selectedTags, setSelectedTags] = useState(["Must try"]);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);

    const filtered = RESTAURANTS.filter((r) =>
        r.toLowerCase().includes(restaurant.toLowerCase())
    );

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!restaurant || rating === 0) return;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        // Reset form
        setRestaurant("");
        setRating(4);
        setOrder("");
        setReview("");
        setSelectedTags(["Must try"]);
        setPhotoPreview(null);
    };

    return (
        <Layout>
            <div style={{ padding: '36px 48px', maxWidth: '600px' }}>
                <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: '#2C2C2A', marginBottom: 28 }}>
                    Add a Review
                </h1>

                {/* Restaurant search */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Restaurant
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            style={{
                                width: '100%',
                                border: '1px solid #EDE8E0',
                                borderRadius: 8,
                                padding: '10px 12px',
                                fontFamily: 'Georgia, serif',
                                fontSize: 14,
                                color: '#2C2C2A',
                                background: '#fff',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#BA7517'}
                            onBlur={(e) => e.target.style.borderColor = '#EDE8E0'}
                            placeholder="Search for a restaurant..."
                            value={restaurant}
                            onChange={(e) => {
                                setRestaurant(e.target.value);
                                setShowSuggestions(true);
                            }}
                        />
                        {showSuggestions && restaurant && filtered.length > 0 && (
                            <div style={{
                                position: 'absolute',
                                top: 'calc(100% + 4px)',
                                left: 0,
                                right: 0,
                                background: '#fff',
                                border: '1px solid #EDE8E0',
                                borderRadius: 8,
                                zIndex: 10,
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            }}>
                                {filtered.map((r) => (
                                    <div
                                        key={r}
                                        onClick={() => {
                                            setRestaurant(r);
                                            setShowSuggestions(false);
                                        }}
                                        style={{
                                            padding: '10px 12px',
                                            fontSize: 14,
                                            cursor: 'pointer',
                                            color: '#2C2C2A',
                                            transition: 'background 0.15s',
                                            background: '#fff',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#FAEEDA'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                                    >
                                        {r}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Star rating */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Your Rating
                    </label>
                    <div style={{ display: 'flex', gap: -8 }}>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <span
                                key={n}
                                onClick={() => setRating(n)}
                                onMouseEnter={() => setHoverRating(n)}
                                onMouseLeave={() => setHoverRating(0)}
                                style={{
                                    fontSize: 24,
                                    cursor: 'pointer',
                                    color: n <= (hoverRating || rating) ? '#BA7517' : '#D4C9BB',
                                    transition: 'color 0.15s, transform 0.15s',
                                    userSelect: 'none',
                                    padding: '0 8px',
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                {/* What did you order */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        What did you order?
                    </label>
                    <input
                        style={{
                            width: '100%',
                            border: '1px solid #EDE8E0',
                            borderRadius: 8,
                            padding: '10px 12px',
                            fontFamily: 'Georgia, serif',
                            fontSize: 14,
                            color: '#2C2C2A',
                            background: '#fff',
                            outline: 'none',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#BA7517'}
                        onBlur={(e) => e.target.style.borderColor = '#EDE8E0'}
                        placeholder="e.g. Rare beef pho, spring rolls..."
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                    />
                </div>

                {/* Review text */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Your Review
                    </label>
                    <textarea
                        style={{
                            width: '100%',
                            border: '1px solid #EDE8E0',
                            borderRadius: 8,
                            padding: '10px 12px',
                            fontFamily: 'Georgia, serif',
                            fontSize: 14,
                            color: '#2C2C2A',
                            background: '#fff',
                            outline: 'none',
                            resize: 'none',
                            height: 120,
                            lineHeight: 1.5,
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#BA7517'}
                        onBlur={(e) => e.target.style.borderColor = '#EDE8E0'}
                        placeholder="Tell your friends what you thought..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>

                {/* Tags */}
                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Tags
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {TAGS.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: 20,
                                    border: selectedTags.includes(tag) ? '1.5px solid #BA7517' : '1.5px solid #D4C9BB',
                                    fontSize: 13,
                                    cursor: 'pointer',
                                    background: selectedTags.includes(tag) ? '#BA7517' : 'transparent',
                                    color: selectedTags.includes(tag) ? '#fff' : '#2C2C2A',
                                    fontFamily: 'Georgia, serif',
                                    fontWeight: selectedTags.includes(tag) ? 600 : 400,
                                    transition: 'all 0.15s',
                                }}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Photo upload */}
                <div style={{ marginBottom: 24 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#888780', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Add a Photo
                    </label>
                    <div
                        onClick={() => fileInputRef.current.click()}
                        style={{
                            border: '1.5px dashed #BA7517',
                            borderRadius: 8,
                            background: '#FEF0D8',
                            padding: 16,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#FDF4E3'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#FEF0D8'}
                    >
                        {photoPreview ? (
                            <img src={photoPreview} alt="Meal preview" style={{
                                width: '100%',
                                maxHeight: 160,
                                objectFit: 'cover',
                                borderRadius: 6,
                                display: 'block',
                            }} />
                        ) : (
                            <span style={{
                                color: '#BA7517',
                                fontSize: 14,
                                fontWeight: 500,
                                fontFamily: 'Georgia, serif',
                            }}>
                                + Click to upload a meal photo
                            </span>
                        )}
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handlePhotoChange}
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    style={{
                        width: '100%',
                        padding: '12px 0',
                        borderRadius: 8,
                        border: '1.5px solid #2C2C2A',
                        background: 'transparent',
                        fontFamily: 'Georgia, serif',
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#2C2C2A',
                        cursor: 'pointer',
                        marginTop: 20,
                        transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#2C2C2A';
                        e.currentTarget.style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#2C2C2A';
                    }}
                >
                    Post Review
                </button>

                {/* Toast notification */}
                {submitted && (
                    <div style={{
                        position: 'fixed',
                        bottom: 32,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#2C2C2A',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: 999,
                        fontSize: 14,
                        fontFamily: 'Georgia, serif',
                        zIndex: 1000,
                    }}>
                        ✓ Review posted!
                    </div>
                )}
            </div>
        </Layout>
    );
}

