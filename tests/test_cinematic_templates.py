"""
Tests for the 5-Type Cinematic Prompt Library Registry.
"""

from pipeline.prompts import (
    CINEMATIC_TEMPLATES,
    CORE_PRINCIPLE,
    SHARED_TECH_STACK,
    get_master_prompt,
    get_synthesis_prompt,
    get_template,
    list_templates,
)


def test_cinematic_templates_count():
    assert len(CINEMATIC_TEMPLATES) == 6
    templates = list_templates()
    assert len(templates) == 6


def test_cinematic_templates_keys():
    expected_ids = {
        "creative_portfolio",
        "saas_product_launch",
        "corporate_institutional",
        "creative_agency",
        "consumer_product_ecommerce",
        "minimal_editorial",
    }
    assert set(CINEMATIC_TEMPLATES.keys()) == expected_ids


def test_template_fields():
    required_fields = {
        "id", "title", "genre", "references", "design_philosophy",
        "creative_direction", "ux_philosophy", "technical_architecture",
        "motion_system", "performance_rules", "master_prompt", "assets_to_generate",
    }
    for template_id, template in CINEMATIC_TEMPLATES.items():
        missing = required_fields - set(template.keys())
        assert not missing, f"{template_id} missing fields: {missing}"
        assert len(template["references"]) > 0
        assert len(template["master_prompt"]) > 100
        assert template["genre"] in {"genre_0", "genre_1", "genre_2", "genre_2b"}


def test_template_six_section_structure():
    six_sections = {
        "creative_direction", "ux_philosophy", "technical_architecture",
        "motion_system", "performance_rules", "master_prompt",
    }
    for template_id, template in CINEMATIC_TEMPLATES.items():
        for section in six_sections:
            assert section in template, f"{template_id} missing section: {section}"
            assert len(template[section]) > 20, f"{template_id}[{section}] too short"


def test_get_template():
    portfolio = get_template("creative_portfolio")
    assert portfolio["title"] == "Creative / Film Portfolio"
    assert portfolio["genre"] == "genre_2b"

    # Fallback default
    unknown = get_template("non_existent")
    assert unknown["id"] == "creative_portfolio"


def test_get_master_prompt():
    prompt = get_master_prompt("creative_portfolio")
    assert "structured implementation plan" in prompt
    assert len(prompt) > 100


def test_get_synthesis_prompt():
    prompt = get_synthesis_prompt("saas_product_launch", "Build a site for Acme Corp")
    assert "DO NOT clone" in prompt
    assert "extract" in prompt.lower()
    assert "1. Creative Direction" in prompt


def test_shared_tech_stack():
    assert "Lenis" in SHARED_TECH_STACK["scroll_physics"]
    assert "GSAP" in SHARED_TECH_STACK["scroll_animation"]
    assert "React Three Fiber" in SHARED_TECH_STACK["3d_full_scene"]


def test_core_principle():
    assert "Scroll-based ≠ cinematic" in CORE_PRINCIPLE
    assert "Synthesize the" in CORE_PRINCIPLE and "clone" in CORE_PRINCIPLE
